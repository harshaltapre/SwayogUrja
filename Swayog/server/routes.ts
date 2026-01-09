import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.inquiries.create.path, async (req, res) => {
  console.log(" API HIT:", api.inquiries.create.path);
  console.log("BODY:", req.body);

    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);

      // Email notification logic
      // Target address: prefer `NOTIFY_EMAIL` from env, fall back to hardcoded
      const targetEmail = process.env.NOTIFY_EMAIL || "harshaltapre26@gmail.com";

      // Prepare message body
      const messageText = `New Inquiry Details:\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nConsumer ID: ${inquiry.customerNo || "N/A"}\nProject Type: ${inquiry.projectType}\nMessage: ${inquiry.message}`;

      // Create transporter. Prefer EMAIL_* env vars, fall back to SMTP_*;
      // if none provided, fall back to Ethereal for local testing.
      let transporter: nodemailer.Transporter;

      const smtpHost = process.env.EMAIL_HOST || process.env.SMTP_HOST;
      const smtpUser = process.env.EMAIL_USER || process.env.SMTP_USER;
      const smtpPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
      const smtpPort = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || "587");
      const smtpSecure = (process.env.EMAIL_SECURE || process.env.SMTP_SECURE) === "true";

      if (smtpHost && smtpHost !== "HOST" && smtpUser && smtpPass) {
        // Support Gmail conveniently (STARTTLS on port 587) and custom SMTP hosts.
        if (smtpHost.includes("gmail.com") || smtpHost.includes("googlemail.com")) {
          transporter = nodemailer.createTransport({
            service: "gmail",
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
        // createTestAccount returns credentials for ethereal.email
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: { user: testAccount.user, pass: testAccount.pass },
        });
      }

      const mailOptions = {
        from: process.env.EMAIL_FROM || smtpUser || process.env.EMAIL_USER || "no-reply@example.com",
        to: targetEmail,
        subject: `New Solar Inquiry from ${inquiry.name}`,
        text: messageText,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        // If using ethereal, print preview URL for convenience
        if (nodemailer.getTestMessageUrl && info) {
          const preview = nodemailer.getTestMessageUrl(info);
          if (preview) console.log("Preview URL:", preview);
        }
      } catch (err) {
        console.error("Failed to send email notification:", err);
      }

      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
