export function databaseErrorResponse(error) {
  console.error("Database operation failed:", error);

  if (["P1000", "P1001", "P1010"].includes(error?.code)) {
    return Response.json(
      { message: "The database is temporarily unavailable." },
      { status: 503 },
    );
  }

  return Response.json(
    { message: "The request could not be completed." },
    { status: 500 },
  );
}
