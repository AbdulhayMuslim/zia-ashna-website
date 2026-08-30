export function databaseErrorResponse(error) {
  console.error("Database operation failed:", error);

  if (["P1000", "P1001", "P1010"].includes(error?.code)) {
    return Response.json(
      { success: false, error: "DATABASE_UNAVAILABLE", message: "The database is temporarily unavailable." },
      { status: 503 },
    );
  }

  if (["P2024", "P2034"].includes(error?.code)) {
    return Response.json(
      { success: false, error: "DATABASE_BUSY", message: "The database is busy. Please retry the request." },
      { status: 503, headers: { "Retry-After": "1" } },
    );
  }

  if (error?.code === "P2025") {
    return Response.json(
      { success: false, error: "NOT_FOUND", message: "The requested record was not found." },
      { status: 404 },
    );
  }

  return Response.json(
    { success: false, error: "DATABASE_ERROR", message: "The request could not be completed." },
    { status: 500 },
  );
}
