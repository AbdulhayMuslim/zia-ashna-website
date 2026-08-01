export async function GET() {
  return Response.json({
    message: "Hello from backend!",
    framework: "Next.js",
    year: 2026,
    learning: true,
  });
}
