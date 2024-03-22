import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/lib/db/schema.ts",
	out: "./migrations",
	driver: "better-sqlite",
	dbCredentials: {
		url: "./data/db/sqlite.db",
	},
	verbose: true,
	strict: true
});