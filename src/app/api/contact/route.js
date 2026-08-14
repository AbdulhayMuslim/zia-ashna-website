import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { databaseErrorResponse } from "@/lib/api-error";

const contactSchema = z.object({
  name: z.string().trim().min(3).max(100),
  email: z.email().trim().max(254),
  _subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(10).max(5000),
});

const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function isRateLimited(key) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > MAX_ATTEMPTS;
}

export async function POST(request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return Response.json({ message: "Unsupported content type." }, { status: 415 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() || "local";
  if (isRateLimited(clientKey)) {
    return Response.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ message: "Please check the form fields." }, { status: 400 });
  }

  try {
    await prisma.contactSubmission.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        subject: result.data._subject,
        message: result.data.message,
      },
    });
  } catch (error) {
    return databaseErrorResponse(error);
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) return Response.json({ message: "Message received." }, { status: 201 });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(result.data),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    return Response.json({ message: "Message delivery failed." }, { status: 502 });
  }

  return Response.json({ message: "Message sent and saved." }, { status: 201 });
}
