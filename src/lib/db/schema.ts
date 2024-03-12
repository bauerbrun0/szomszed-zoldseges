import { randomUUID } from "crypto";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// for lucia we have to use the same table for both admin and non-admin users
export const users = sqliteTable("users", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull().unique(),
	hashedPassword: text("hashed_password").notNull(),
	isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
	image: text("image").notNull()
});

// login for non privileged users will be vulnerable to sql injection
// because of this, we will need separate tables for non-admin and admin users	
export const nonAdminUsers = sqliteTable("non_admin_users", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull().unique(),
	hashedPassword: text("hashed_password").notNull(),
	image: text("image").notNull()
});

export const adminUsers = sqliteTable("admin_users", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull().unique(),
	hashedPassword: text("hashed_password").notNull(),
	image: text("image").notNull()
});

export const sessions = sqliteTable("sessions", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: integer("expires_at").notNull()
});

export const suppliers = sqliteTable("suppliers", {
	id: text("id").notNull().primaryKey(),
	name: text("name").notNull(),
	person: text("person").notNull(),
	email: text("email").notNull(),
	address: text("address").notNull(),
	phone: text("phone").notNull(),
	secret: integer("secret", { mode: "boolean" }).notNull(),
});

export const customerNeeds = sqliteTable("customer_needs", {
	id: integer("id").notNull().primaryKey({ autoIncrement: true }),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	content: text("content").notNull(),
	sessionId: text("session_id") // should not reference sessions.id
});	

export const news = sqliteTable("news", {
	id: text("id", { length: 36 }).primaryKey().$defaultFn(() => randomUUID()),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	content: text("content").notNull(),
});

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewNonAdminUser = typeof nonAdminUsers.$inferInsert;
export type NonAdminUser = typeof nonAdminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
export type NewSessionData = typeof sessions.$inferInsert;
export type SessionData = typeof sessions.$inferSelect;
export type NewSupplier = typeof suppliers.$inferInsert;
export type Supplier = typeof suppliers.$inferSelect;
export type NewCustomerNeed = typeof customerNeeds.$inferInsert;
export type CustomerNeed = typeof customerNeeds.$inferSelect;
export type NewNews = typeof news.$inferInsert;
export type News = typeof news.$inferSelect;