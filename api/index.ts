import express from "express";
import nodemailer from 'nodemailer';
import { supabase } from './supabase';

const app = express();
app.use(express.json());

// Enable CORS for development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Test Supabase Connection
app.get("/api/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase.from('stats').select('count').limit(1);
    if (error) throw error;
    res.json({ success: true, message: "Supabase connected successfully!", data });
  } catch (error: any) {
    console.error("Supabase Test Error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to connect to Supabase" });
  }
});

// Visitor Counter API
app.get("/api/stats/visitor-count", async (req, res) => {
  try {
    // 1. Get current count
    const { data, error: getError } = await supabase
      .from('stats')
      .select('value')
      .eq('key', 'visitor_count')
      .single();

    if (getError && getError.code !== 'PGRST116') throw getError;

    const currentCount = data?.value || 0;
    const newCount = currentCount + 1;

    // 2. Increment and Update
    const { error: updateError } = await supabase
      .from('stats')
      .update({ value: newCount })
      .eq('key', 'visitor_count');

    if (updateError) throw updateError;

    res.json({ success: true, count: newCount });
  } catch (error: any) {
    console.error("Visitor count error:", error);
    res.status(500).json({ success: false, error: "Failed to update counter" });
  }
});

// Vynta Tester Signup API
app.post("/api/testers/signup", async (req, res) => {
  const { email } = req.body;
  console.log("Signup attempt for:", email);

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: "Please enter a valid Gmail address." });
  }

  try {
    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('testers')
      .insert([{ email }]);

    if (dbError) {
      if (dbError.code === '23505') { // Unique constraint violation in Postgres
        console.log("Already signed up:", email);
        return res.status(400).json({ success: false, error: "You're already on the list! Check your mail for updates." });
      }
      throw dbError;
    }
    
    console.log("Saved to Supabase:", email);

    // 2. Setup Transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
      }
    });

    // 3. Mail to Admin (Murshid)
    const adminMail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `🚀 New Vynta Tester Joined: ${email}`,
      text: `Hello Murshid,\n\nA new person has signed up to be a tester for Vynta: ${email}\n\nYou should add them to the beta list soon.`,
    };

    // 4. Mail to Tester (User)
    const testerMail = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Welcome to Vynta Beta Testing!`,
      text: `Hello!\n\nThanks for signing up to test Vynta. I'll be adding you as a Tester soon.\n\nPlease keep an eye on your inbox for a follow-up email with the formal invitation and confirmation to become a tester.\n\nBest,\nMurshid R`,
    };

    console.log("Sending notifications...");
    await Promise.all([
      transporter.sendMail(adminMail).catch(e => console.error("Admin mail failed:", e)),
      transporter.sendMail(testerMail).catch(e => console.error("Tester mail failed:", e))
    ]);

    res.json({ success: true, message: "Welcome to the team! Check your mail for confirmation soon." });
  } catch (error: any) {
    console.error("CRITICAL SIGNUP ERROR:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Something went wrong. Please try again later." 
    });
  }
});

app.post("/api/contact", async (req, res) => {
  console.log("Received contact form request:", req.body);
  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
      }
    });

    // Verify connection configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("SMTP VERIFICATION ERROR:", verifyError);
      throw verifyError;
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Portfolio Contact: ${subject} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    };

    console.log("Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully! Message ID:", info.messageId);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error: any) {
    console.error("FULL NODE MAILER ERROR STACK:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Failed to send message." 
    });
  }
});

async function init() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error("Vite failed to load:", e);
    }
  }
}

init().catch(err => {
  console.error("Init failure:", err);
});
// Export the app for Vercel serverless execution
export default app;

// Only listen when running locally, not on Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = 3005;
  app.listen(PORT, "127.0.0.1", () => {
    console.log(`\n  🚀 Cinematic Chennai is running!`);
    console.log(`  ➜  Local (API + Vite): http://127.0.0.1:${PORT}`);
  });
}
