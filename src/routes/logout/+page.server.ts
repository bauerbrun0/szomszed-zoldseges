import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/auth";

export const actions: Actions = {
	default: async({ locals, cookies }) => {
		if (!locals.session) {
			return fail(401);
		}
	
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
		});
	
		return redirect(302, "/");
	}
};