import nodemailer from "nodemailer";

const MAX_LENGTH = { name: 200, email: 320, phone: 50, service: 200, message: 5000 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Labels for the service `<select>` values on the contact page. */
const SERVICE_LABELS: Record<string, string> = {
  "pool-design": "Pool Design & Build",
  landscape: "Landscape Design",
  remodel: "Remodel & Upgrades",
  consultation: "Free Consultation",
};

const WP_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "hb-pools.demo-link.tech";
const WP_CONTACT_ENDPOINT = `https://${WP_DOMAIN}/wp-json/custom/v1/contact-submission-next`;

interface Submission {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

function field(body: Record<string, unknown>, key: keyof typeof MAX_LENGTH): string {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, MAX_LENGTH[key]) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Saves the submission as a `contact_submission` post via the Contact API Handler plugin. */
async function saveToWordPress(apiKey: string, submission: Submission): Promise<void> {
  const response = await fetch(WP_CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: JSON.stringify({
      // `services` must match one of the SCF select choices exactly, which spell "&" as "And".
      services: submission.service.replace(/\s*&\s*/g, " And "),
      // Sent under both keys so the plugin can read either `name` or `full_name`.
      name: submission.name,
      full_name: submission.name,
      email: submission.email,
      phone: submission.phone,
      message: submission.message,
    }),
    cache: "no-store",
  });

  const result = await response.text().catch(() => "");
  if (!response.ok) {
    throw new Error(`WordPress responded ${response.status}: ${result}`);
  }
  if (process.env.NODE_ENV === "development") {
    console.log("Contact form: WordPress response", result);
  }
}

/** Emails the submission to `CONTACT_TO_EMAIL` through Gmail SMTP. */
async function sendEmail(user: string, pass: string, to: string, submission: Submission): Promise<void> {
  const { name, email, phone, service, message } = submission;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Service", service],
  ].filter((row): row is [string, string] => row[1] !== "");

  const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", message].join("\n");

  const html = `
    <h2>New contact form submission</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`)
        .join("")}
    </table>
    <p style="white-space:pre-line">${escapeHtml(message)}</p>
  `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: { name: process.env.CONTACT_FROM_NAME || "Website Contact Form", address: user },
    to: to.split(",").map((address) => address.trim()).filter(Boolean),
    replyTo: email,
    subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
    text,
    html,
  });
}

export async function POST(request: Request) {
  const smtpUser = process.env.GMAIL_SMTP_USER;
  const smtpPass = process.env.GMAIL_SMTP_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL;
  const wpApiKey = process.env.WP_API_KEY;

  if (!smtpUser || !smtpPass || !to || !wpApiKey) {
    console.error(
      "Contact form: GMAIL_SMTP_USER, GMAIL_SMTP_APP_PASSWORD, CONTACT_TO_EMAIL or WP_API_KEY is not set"
    );
    return Response.json({ error: "The contact form is not configured." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.company === "string" && body.company !== "") {
    return Response.json({ ok: true });
  }

  const name = field(body, "name");
  const email = field(body, "email");
  const phone = field(body, "phone");
  const rawService = field(body, "service");
  const service = SERVICE_LABELS[rawService] ?? rawService;
  const message = field(body, "message");

  if (!name || !email || !message) {
    return Response.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const submission: Submission = { name, email, phone, service, message };

  const [wpResult, emailResult] = await Promise.allSettled([
    saveToWordPress(wpApiKey, submission),
    sendEmail(smtpUser, smtpPass, to, submission),
  ]);

  if (wpResult.status === "rejected") {
    console.error("Contact form: saving to WordPress failed", wpResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("Contact form: sending email failed", emailResult.reason);
  }

  // The enquiry is captured as long as either channel succeeded.
  if (wpResult.status === "rejected" && emailResult.status === "rejected") {
    return Response.json({ error: "Sorry, your message could not be sent. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
