import { lucia } from "$lib/auth";
import logger from "$lib/utils/logger";
import type { Handle, HandleServerError } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
			httpOnly: false
		});
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
			httpOnly: false
		});
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

export const handleError: HandleServerError = async ({ error }) => {
	logger.error("Unexpected error", { error });
};