import express from "express";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import db from './db';
dotenv.config();

const app = express();
app.use(express.json());

// API routes FIRST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Visitor Counter API
app.get("/api/stats/visitor-count", (req, res) => {
  try {
    const stmt = db.prepare("UPDATE stats SET value = value + 1 WHERE key = 'visitor_count' RETURNING value");
    const result = stmt.get() as { value: number };
    res.json({ success: true, count: result.value });
  } catch (error: any) {
    console.error("Visitor count error:", error);
    // Fallback if update fails (e.g. table doesn't exist yet)
    res.json({ success: false, count: 0 });
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
    // 1. Save to Database
    const stmt = db.prepare("INSERT INTO testers (email) VALUES (?)");
    stmt.run(email);
    console.log("Saved to DB:", email);

    // 2. Setup Transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
      }
    });

    // 3. Verify Connection
    try {
      await transporter.verify();
      console.log("SMTP connection verified");
    } catch (vErr) {
      console.error("SMTP Verification Failed:", vErr);
      throw new Error("Email service is temporarily unavailable.");
    }

    // 4. Mail to Admin (Murshid)
    const adminMail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `🚀 New Vynta Tester Joined: ${email}`,
      text: `Hello Murshid,\n\nA new person has signed up to be a tester for Vynta: ${email}\n\nYou should add them to the beta list soon.`,
    };

    // 5. Mail to Tester (User)
    const testerMail = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Welcome to Vynta Beta Testing!`,
      text: `Hello!\n\nThanks for signing up to test Vynta. I'll be adding you as a Tester soon.\n\nPlease keep an eye on your inbox for a follow-up email with the formal invitation and confirmation to become a tester.\n\nBest,\nMurshid R`,
    };

    console.log("Sending notifications...");
    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(testerMail)
    ]);
    console.log("All notifications sent successfully");

    res.json({ success: true, message: "Welcome to the team! Check your mail for confirmation soon." });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      console.log("Already signed up:", email);
      return res.status(400).json({ success: false, error: "You're already on the list! Check your mail for updates." });
    }
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
      
      const PORT = 3005;
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`\n  🚀 Cinematic Chennai is running!`);
        console.log(`  ➜  Local:   http://localhost:${PORT}`);
      });
    } catch (e) {
      console.error("Vite failed to load:", e);
    }
  }
}

init();

export default app;
