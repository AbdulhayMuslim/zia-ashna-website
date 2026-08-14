import { databaseErrorResponse } from "@/lib/api-error";
import { isCmsSection, readCmsSection } from "@/lib/cms-data";

const publicSections = new Set(["hero", "about", "activity", "history", "contact", "settings"]);

export async function GET(_request, { params }) {
  const { section } = await params;
  if (!publicSections.has(section) || !isCmsSection(section)) return Response.json({ message: "Not found." }, { status: 404 });
  try {
    const data = await readCmsSection(section);
    return Response.json({ data }, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } });
  } catch (error) {
    return databaseErrorResponse(error);
  }
}
