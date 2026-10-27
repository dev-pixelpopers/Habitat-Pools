import { Resend } from "resend";

const MAX_LENGTH = { name: 200, email: 320, phone: 50, service: 200, message: 5000 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;

  if (!apiKey || !from || !to) {
    console.error("Contact form: RESEND_API_KEY, CONTACT_FROM or CONTACT_TO is not set");
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
  const service = field(body, "service");
  const message = field(body, "message");

  if (!name || !email || !message) {
    return Response.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

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

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: to.split(",").map((address) => address.trim()).filter(Boolean),
    replyTo: email,
    subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
    text,
    html,
  });

  if (error) {
    console.error("Contact form: Resend failed", error);
    return Response.json({ error: "Sorry, your message could not be sent. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
