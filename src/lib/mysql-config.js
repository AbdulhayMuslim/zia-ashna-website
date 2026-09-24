export function mysqlConfigFromUrl(connectionString) {
  const url = new URL(connectionString);
  if (url.protocol !== "mysql:" && url.protocol !== "mariadb:") {
    throw new Error("DATABASE_URL must use mysql:// or mariadb://.");
  }

  const connectionLimit = Number(url.searchParams.get("connection_limit") || 5);
  if (!Number.isInteger(connectionLimit) || connectionLimit < 1) {
    throw new Error("DATABASE_URL connection_limit must be a positive integer.");
  }

  return {
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.slice(1)),
    connectionLimit,
    ...(url.searchParams.get("ssl") === "true" ? { ssl: { rejectUnauthorized: true } } : {}),
  };
}
