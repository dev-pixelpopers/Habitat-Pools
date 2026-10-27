export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  /** Honeypot field; left empty by real visitors. */
  company?: string;
}

/** Posts a contact form submission to `/api/contact`; throws with a user-facing message on failure. */
export async function sendContact(submission: ContactSubmission): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error ?? "Sorry, your message could not be sent. Please try again.");
  }
}
