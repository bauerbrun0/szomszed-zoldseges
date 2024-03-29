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
		id: attributes.id,
		username: attributes.username,
		isAdmin: attributes.isAdmin,
		image: attributes.image,
	})
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: User;
	}
}