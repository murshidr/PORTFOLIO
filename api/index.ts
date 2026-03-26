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
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: "Invalid email" });
  }

  try {
    const stmt = db.prepare("INSERT INTO testers (email) VALUES (?)");
    stmt.run(email);

    // Notify user via email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Vynta Tester: ${email}`,
      text: `A new person has signed up to test Vynta: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Signed up successfully!" });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(400).json({ success: false, error: "Already signed up!" });
    }
    console.error("Signup error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
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
