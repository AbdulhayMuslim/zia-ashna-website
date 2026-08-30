import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { isCmsSection, readCmsSection, writeCmsSection } from "@/lib/cms-data";
import { cmsSchemas } from "@/validations/cms";
import { revalidatePath } from "next/cache";

export async function GET(_request, { params }) {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const { section } = await params;
  if (!isCmsSection(section)) return Response.json({ message: "Unknown CMS section." }, { status: 404 });
  try {
    return Response.json({ data: await readCmsSection(section) });
  } catch (error) {
    if (error instanceof Error && error.message === "CMS_WRITE_CONFLICT") {
      return Response.json({ message: "This content changed in another session. Reload before saving again." }, { status: 409 });
    }
    return databaseErrorResponse(error);
  }
}

export async function PUT(request, { params }) {
  if (!(await isAdminAuthenticated(request))) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const { section } = await params;
  const schema = cmsSchemas[section];
  if (!schema) return Response.json({ message: "Unknown CMS section." }, { status: 404 });
  const result = schema.safeParse(await request.json().catch(() => null));
  if (!result.success) return Response.json({ message: "Please check the form fields.", errors: result.error.flatten().fieldErrors }, { status: 400 });
  try {
    const data = await writeCmsSection(section, result.data);
    revalidatePath("/", "layout");
    return Response.json({ data });
  } catch (error) {
    return databaseErrorResponse(error);
  }
}
