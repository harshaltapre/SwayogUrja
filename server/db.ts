import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

const { Pool } = pg;

// If an environment-level placeholder is present (e.g. set by a platform),
// prefer a real value from the project's `.env` file when available.
function isPlaceholderDatabaseUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "HOST" || url.includes("USER:PASSWORD@HOST");
  } catch {
    return false;
  }
}

if (process.env.DATABASE_URL && isPlaceholderDatabaseUrl(process.env.DATABASE_URL)) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const parsedEnv = dotenv.parse(fs.readFileSync(envPath, "utf8"));
      if (parsedEnv.DATABASE_URL) {
        process.env.DATABASE_URL = parsedEnv.DATABASE_URL;
        console.log("Overrode placeholder DATABASE_URL from .env");
      }
    }
  } catch (e) {
    console.error("Failed to override placeholder DATABASE_URL from .env:", e);
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
