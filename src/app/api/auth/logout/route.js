import { isSameOriginRequest } from "@/lib/request-security";
import { SESSION_COOKIE } from "@/lib/session";

export async function POST(request) {
  if (!isSameOriginRequest(request)) return Response.json({ message: "Cross-origin requests are not allowed." }, { status: 403 });
  const response = Response.json({ message: "Signed out." });
  response.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return response;
}
