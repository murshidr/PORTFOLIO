import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, subject, message } = req.body;

  try {
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
      subject: `Portfolio Contact: ${subject} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error: any) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
