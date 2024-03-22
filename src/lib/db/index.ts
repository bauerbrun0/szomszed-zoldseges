import config from "$lib/configs/app.config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { users, sessions } from "./schema";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

export const sqlite = new Database(config.DB_CONNECTION_STRING);
const db = drizzle(sqlite, { schema });

export const luciaAdapter = new DrizzleSQLiteAdapter(db, sessions, users);

export default db;