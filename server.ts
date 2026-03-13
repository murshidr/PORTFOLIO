import express from "express";
import { createServer as createViteServer } from "vite";
import os from 'os';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// API routes FIRST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  console.log("Received contact form request:", req.body);
  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `Portfolio Contact: ${subject} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("FULL NODE MAILER ERROR:", error);
    res.status(500).json({ success: false, error: "Failed to send message." });
  }
});

async function init() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
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
  }
}

init();

export default app;
