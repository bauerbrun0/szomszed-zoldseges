import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// for lucia we have to use the same table for both admin and non-admin users
export const users = sqliteTable("users", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull().unique(),
	hashedPassword: text("hashed_password").notNull(),
	isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false)
});

// login for non privileged users will be vulnerable to sql injection
// because of this, we will need separate tables for non-admin and admin users	
export const nonAdminUsers = sqliteTable("non_admin_users", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull().unique(),
	hashedPassword: text("hashed_password").notNull()
});

export const adminUsers = sqliteTable("admin_users", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull().unique(),
	hashedPassword: text("hashed_password").notNull()
});

export const sessions = sqliteTable("sessions", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: integer("expires_at").notNull()
});

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewNonAdminUser = typeof nonAdminUsers.$inferInsert;
export type NonAdminUser = typeof nonAdminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
export type NewSessionData = typeof sessions.$inferInsert;
export type SessionData = typeof sessions.$inferSelect;