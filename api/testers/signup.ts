import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, error: "Please enter a valid Gmail address." });
  }

  try {
    const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');
    
    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('testers')
      .insert([{ email }]);

    if (dbError) {
      if (dbError.code === '23505') {
        return res.status(400).json({ success: false, error: "You're already on the list!" });
      }
      throw dbError;
    }

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

    const adminMail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `🚀 New Vynta Tester Joined: ${email}`,
      text: `New signup: ${email}`,
    };

    const testerMail = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Welcome to Vynta Beta Testing!`,
      text: `Thanks for signing up! I'll be adding you soon.`,
    };

    await Promise.all([
      transporter.sendMail(adminMail).catch(e => console.error("Admin mail failed:", e)),
      transporter.sendMail(testerMail).catch(e => console.error("Tester mail failed:", e))
    ]);

    return res.status(200).json({ success: true, message: "Welcome! Check your mail soon." });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
