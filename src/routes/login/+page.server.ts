import { parseSigninForm } from "$lib/utils/validators";
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

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

		console.log("Signing in with", fields);
	}
};