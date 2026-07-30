import nodemailer from "nodemailer";
import { siteConfig } from "./site";

type IntroPayload = {
  partnerName: string;
  company: string;
  email: string;
  studentHandles: string;
  message: string;
};

export async function notifyPlacementLead(payload: IntroPayload): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = siteConfig.placementEmail;

  if (!host || !user || !pass) {
    console.info("[intro] SMTP not configured — stored in DB only", {
      to,
      partner: payload.partnerName,
      students: payload.studentHandles,
    });
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? user,
    to,
    replyTo: payload.email,
    subject: `[Showcase intro] ${payload.company} → ${payload.studentHandles}`,
    text: [
      `Partner: ${payload.partnerName}`,
      `Company: ${payload.company}`,
      `Email: ${payload.email}`,
      `Students: ${payload.studentHandles}`,
      "",
      payload.message,
    ].join("\n"),
  });

  return true;
}

export async function notifyRsvp(payload: {
  name: string;
  email: string;
  company?: string | null;
  role?: string | null;
}): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return false;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? user,
    to: siteConfig.placementEmail,
    replyTo: payload.email,
    subject: `[Showcase RSVP] ${payload.name} (${payload.company ?? "n/a"})`,
    text: JSON.stringify(payload, null, 2),
  });
  return true;
}
