import type { User } from "$lib/db/schema";
import { parseSigninForm } from "$lib/utils/validators";
import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from "@sveltejs/kit";
import userService from "$lib/services/userService";
import { InvalidCredentialsError } from "$lib/utils/errors";
import { lucia } from "$lib/auth";

export const actions: Actions = {
	default: async({ request, cookies }) => {
		const formData = await request.formData();
		const { signinFormFields: fields, signinFormErrors: errors } = parseSigninForm(formData);

		if (errors) {
			return fail(422, {
				fields: {
					username: fields.username,
				},
				errors
			});
		}

		let user: Omit<User, "hashedPassword">;

		try {
			user = await userService.signinAdmin(fields.username, fields.password);
		} catch (e: unknown) {
			if (e instanceof InvalidCredentialsError) {
				return fail(401, {
					fields: {
						username: fields.username
					},
					errors: {
						username: undefined,
						password: "Hibás felhasználónév vagy jelszó"
					}
				});
			}
			throw e;
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
			httpOnly: false	// For XSS demo
		});

		return redirect(302, "/");
	}
};