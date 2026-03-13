import express from "express";
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
