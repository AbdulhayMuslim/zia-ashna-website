import { randomBytes } from "node:crypto";
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, writeFileSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";

import mariadb from "mariadb";

const command = process.argv[2] || "status";
const runtimeDirectory = path.join(process.cwd(), ".local", "mysql");
const dataDirectory = path.join(runtimeDirectory, "data");
const credentialsFile = path.join(runtimeDirectory, "credentials.json");
const pidFile = path.join(runtimeDirectory, "mysql.pid");
const socketFile = path.join(runtimeDirectory, "mysql.sock");
const logFile = path.join(runtimeDirectory, "mysql.log");
const port = 3307;

function readPid() {
  if (!existsSync(pidFile)) return null;
  const pid = Number(readFileSync(pidFile, "utf8").trim());
  if (!Number.isInteger(pid)) return null;
  try {
    process.kill(pid, 0);
    return pid;
  } catch (error) {
    // Sandboxed development shells may be allowed to read the PID file but not
    // signal a process started outside their namespace.
    return error?.code === "EPERM" ? pid : null;
  }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const connection = await mariadb.createConnection({ host: "127.0.0.1", port, user: "root" });
      await connection.end();
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`Local MySQL did not start. Review ${logFile}.`);
}

function updateEnvironment(connectionString) {
  const envFile = path.join(process.cwd(), ".env");
  const input = existsSync(envFile) ? readFileSync(envFile, "utf8") : "";
  let output = input;
  if (/^DATABASE_URL=/m.test(output)) {
    output = output.replace(/^DATABASE_URL=.*$/m, `DATABASE_URL="${connectionString}"`);
  } else {
    output = `DATABASE_URL="${connectionString}"\n${output}`;
  }
  writeFileSync(envFile, output.endsWith("\n") ? output : `${output}\n`, { mode: 0o600 });
}

async function start() {
  mkdirSync(runtimeDirectory, { recursive: true, mode: 0o700 });
  if (!existsSync(path.join(dataDirectory, "mysql"))) {
    const initialized = spawnSync("mariadb-install-db", [
      "--no-defaults", `--datadir=${dataDirectory}`, "--tmpdir=/tmp",
      "--auth-root-authentication-method=normal", "--skip-test-db",
    ], { env: { ...process.env, TMPDIR: "/tmp" }, stdio: "inherit" });
    if (initialized.status !== 0) throw new Error("Unable to initialize local MySQL.");
  }

  if (!readPid()) {
    const output = openSync(logFile, "a");
    const child = spawn("/usr/libexec/mariadbd", [
      "--no-defaults", `--datadir=${dataDirectory}`, "--tmpdir=/tmp",
      "--bind-address=127.0.0.1", `--port=${port}`, `--pid-file=${pidFile}`,
      `--socket=${socketFile}`, `--log-error=${logFile}`,
    ], { detached: true, stdio: ["ignore", output, output] });
    child.unref();
    closeSync(output);
  }
  await waitForServer();

  const credentials = existsSync(credentialsFile)
    ? JSON.parse(readFileSync(credentialsFile, "utf8"))
    : { user: "zia_ashna", password: randomBytes(24).toString("base64url"), database: "zia_ashna" };
  writeFileSync(credentialsFile, `${JSON.stringify(credentials, null, 2)}\n`, { mode: 0o600 });

  const root = await mariadb.createConnection({ host: "127.0.0.1", port, user: "root" });
  try {
    const account = `${root.escape(credentials.user)}@'127.0.0.1'`;
    await root.query(`CREATE DATABASE IF NOT EXISTS \`${credentials.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await root.query(`CREATE USER IF NOT EXISTS ${account} IDENTIFIED BY ?`, [credentials.password]);
    await root.query(`GRANT ALL PRIVILEGES ON \`${credentials.database}\`.* TO ${account}`);
  } finally {
    await root.end();
  }

  const connectionString = `mysql://${credentials.user}:${encodeURIComponent(credentials.password)}@127.0.0.1:${port}/${credentials.database}?connection_limit=5`;
  updateEnvironment(connectionString);
  console.log(`Local MySQL is running on 127.0.0.1:${port}. The ignored .env file is configured.`);
}

async function stop() {
  const pid = readPid();
  if (!pid) { console.log("Local MySQL is not running."); return; }
  process.kill(pid, "SIGTERM");
  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (!readPid()) { console.log("Local MySQL stopped."); return; }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Local MySQL did not stop within five seconds.");
}

if (command === "start") await start();
else if (command === "stop") await stop();
else if (command === "status") console.log(readPid() ? `Local MySQL is running on 127.0.0.1:${port}.` : "Local MySQL is not running.");
else throw new Error("Usage: node scripts/local-mysql.mjs <start|stop|status>");
