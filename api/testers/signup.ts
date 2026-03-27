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
      subject: `Welcome to the Vynta Inner Circle! 🌌`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { margin: 0; padding: 0; background-color: #050505; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff; }
                .container { max-width: 600px; margin: 40px auto; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                .header { background: linear-gradient(135deg, #00f2ff, #0066ff); padding: 40px 20px; text-align: center; }
                .header h1 { margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; color: #000; }
                .content { padding: 40px; line-height: 1.6; }
                .content h2 { color: #00f2ff; margin-top: 0; }
                .step { background: #111; padding: 20px; border-left: 4px solid #00f2ff; margin: 20px 0; border-radius: 4px; }
                .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #1a1a1a; }
                .btn { display: inline-block; padding: 12px 24px; background: #00f2ff; color: #000; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>VYNTA BETA</h1>
                </div>
                <div class="content">
                    <h2>You're on the list!</h2>
                    <p>Hello tester,</p>
                    <p>Thank you for joining the Vynta Inner Circle. We're thrilled to have you help us shape the future of cinematic digital experiences.</p>
                    
                    <div class="step">
                        <strong>What's Next?</strong><br>
                        I'm currently reviewing your request. You'll receive a formal invitation and access instructions in your inbox very soon.
                    </div>

                    <p>In the meantime, feel free to explore more of my work or follow the journey on GitHub.</p>
                    
                    <a href="https://murshid-r.vercel.app" class="btn">Explore Portfolio</a>
                </div>
                <div class="footer">
                    &copy; 2026 Murshid R | Cinematic Chennai<br>
                    Sent from Vynta Automation Engine
                </div>
            </div>
        </body>
        </html>
      `
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
