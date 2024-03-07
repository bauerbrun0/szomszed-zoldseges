import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { luciaAdapter } from "$lib/db";
import type { User } from "$lib/db/schema";

export const lucia = new Lucia(luciaAdapter, {
	sessionCookie: {
		attributes: {
			secure: !dev,
		}
	},
	getUserAttributes: (attributes) => ({
		username: attributes.username,
		isAdmin: attributes.isAdmin
	})
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<User, "id">;
	}
}