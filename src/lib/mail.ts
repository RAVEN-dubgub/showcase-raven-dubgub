import nodemailer from "nodemailer";
import { Resend } from "resend";
import { siteConfig } from "./site";

type IntroPayload = {
  partnerName: string;
  company: string;
  email: string;
  studentHandles: string;
  message: string;
};

type RsvpPayload = {
  name: string;
  email: string;
  company?: string | null;
  role?: string | null;
};

type NotifyResult = {
  /** True when the placement-lead message was delivered. */
  lead: boolean;
  /** True when the submitter confirmation was delivered. */
  confirm: boolean;
};

function fromAddress(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "onboarding@resend.dev"
  );
}

function hasResend(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function hasSmtp(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim()
  );
}

/** Prefer Resend; fall back to SMTP. Returns null when neither is configured. */
function mailMode(): "resend" | "smtp" | null {
  if (hasResend()) return "resend";
  if (hasSmtp()) return "smtp";
  return null;
}

async function sendViaResend(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    replyTo: opts.replyTo,
  });
  if (error) {
    throw new Error(error.message ?? "Resend send failed");
  }
}

async function sendViaSmtp(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const user = process.env.SMTP_USER!;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: fromAddress() === "onboarding@resend.dev" ? user : fromAddress(),
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
  });
}

async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const mode = mailMode();
  if (!mode) return false;
  if (mode === "resend") {
    await sendViaResend(opts);
  } else {
    await sendViaSmtp(opts);
  }
  return true;
}

function introLeadBody(payload: IntroPayload): string {
  return [
    `Partner: ${payload.partnerName}`,
    `Company: ${payload.company}`,
    `Email: ${payload.email}`,
    `Students: ${payload.studentHandles}`,
    "",
    payload.message,
    "",
    `— Showcase intro · ${siteConfig.url}`,
  ].join("\n");
}

function introConfirmBody(payload: IntroPayload): string {
  return [
    `Hi ${payload.partnerName},`,
    "",
    "We received your intro request for the Hult Cohort showcase.",
    "",
    `Company: ${payload.company}`,
    `Students: ${payload.studentHandles}`,
    "",
    "Our placement lead will follow up within about 24 hours.",
    "",
    "— Hult Cohort Showcase",
    siteConfig.url,
  ].join("\n");
}

function rsvpLeadBody(payload: RsvpPayload): string {
  return [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company ?? "n/a"}`,
    `Role: ${payload.role ?? "n/a"}`,
    "",
    `— Showcase RSVP · ${siteConfig.url}`,
  ].join("\n");
}

function rsvpConfirmBody(payload: RsvpPayload): string {
  return [
    `Hi ${payload.name},`,
    "",
    "You're on the list for the end-of-pilot hiring partner showcase.",
    "",
    "We'll email details closer to the event.",
    "",
    "— Hult Cohort Showcase",
    siteConfig.url,
  ].join("\n");
}

/**
 * Notify placement lead + confirm to the partner.
 * `notified` for the API is true when the lead email succeeded
 * (confirmation is best-effort and reported separately in logs).
 */
export async function notifyIntro(payload: IntroPayload): Promise<NotifyResult> {
  const to = siteConfig.placementEmail;
  const mode = mailMode();

  if (!mode) {
    console.info("[intro] email not configured — stored in DB only", {
      to,
      partner: payload.partnerName,
      students: payload.studentHandles,
    });
    return { lead: false, confirm: false };
  }

  let lead = false;
  let confirm = false;

  try {
    await sendMail({
      to,
      subject: `[Showcase intro] ${payload.company} → ${payload.studentHandles}`,
      text: introLeadBody(payload),
      replyTo: payload.email,
    });
    lead = true;
  } catch (err) {
    console.error(`[intro] lead notify via ${mode} failed`, err);
  }

  try {
    await sendMail({
      to: payload.email,
      subject: "We received your intro request — Hult Cohort Showcase",
      text: introConfirmBody(payload),
    });
    confirm = true;
  } catch (err) {
    console.error(`[intro] partner confirmation via ${mode} failed`, err);
  }

  return { lead, confirm };
}

/** @deprecated Use notifyIntro — kept for call-site clarity during transition. */
export async function notifyPlacementLead(payload: IntroPayload): Promise<boolean> {
  const result = await notifyIntro(payload);
  return result.lead;
}

export async function notifyRsvp(payload: RsvpPayload): Promise<NotifyResult> {
  const mode = mailMode();
  if (!mode) {
    console.info("[rsvp] email not configured — stored in DB only", {
      email: payload.email,
      name: payload.name,
    });
    return { lead: false, confirm: false };
  }

  let lead = false;
  let confirm = false;

  try {
    await sendMail({
      to: siteConfig.placementEmail,
      subject: `[Showcase RSVP] ${payload.name} (${payload.company ?? "n/a"})`,
      text: rsvpLeadBody(payload),
      replyTo: payload.email,
    });
    lead = true;
  } catch (err) {
    console.error(`[rsvp] lead notify via ${mode} failed`, err);
  }

  try {
    await sendMail({
      to: payload.email,
      subject: "RSVP confirmed — Hult Cohort Showcase",
      text: rsvpConfirmBody(payload),
    });
    confirm = true;
  } catch (err) {
    console.error(`[rsvp] guest confirmation via ${mode} failed`, err);
  }

  return { lead, confirm };
}
