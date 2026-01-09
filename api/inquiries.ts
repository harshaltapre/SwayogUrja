// Vercel serverless function for inquiries API
import { api } from '../shared/routes';
import { storage } from '../server/storage';
import { z } from 'zod';
import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const input = api.inquiries.create.input.parse(req.body);
    const inquiry = await storage.createInquiry(input);

    // Email notification logic
    const targetEmail = process.env.NOTIFY_EMAIL || 'harshaltapre26@gmail.com';
    const messageText = `New Inquiry Details:\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nConsumer ID: ${inquiry.customerNo || 'N/A'}\nProject Type: ${inquiry.projectType}\nMessage: ${inquiry.message}`;

    let transporter: nodemailer.Transporter;
    const smtpHost = process.env.EMAIL_HOST || process.env.SMTP_HOST;
    const smtpUser = process.env.EMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '587');
    const smtpSecure = (process.env.EMAIL_SECURE || process.env.SMTP_SECURE) === 'true';

    if (smtpHost && smtpHost !== 'HOST' && smtpUser && smtpPass) {
      if (smtpHost.includes('gmail.com') || smtpHost.includes('googlemail.com')) {
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: smtpUser, pass: smtpPass },
        });
      } else {
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: { user: smtpUser, pass: smtpPass },
        });
      }
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    }

    const mailOptions = {
      from: process.env.SMTP_USER || 'no-reply@example.com',
      to: targetEmail,
      subject: `New Solar Inquiry from ${inquiry.name}`,
      text: messageText,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      if (nodemailer.getTestMessageUrl && info) {
        const preview = nodemailer.getTestMessageUrl(info);
        if (preview) console.log('Preview URL:', preview);
      }
    } catch (err) {
      console.error('Failed to send email notification:', err);
    }

    return res.status(201).json(inquiry);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0].message,
        field: err.errors[0].path.join('.'),
      });
    }
    console.error('Error creating inquiry:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
