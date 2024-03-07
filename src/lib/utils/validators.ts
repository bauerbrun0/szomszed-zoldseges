import { isString } from "$lib/utils/typeguards";

export type SigninFormFields = {
	username: string;
	password: string;
};

export type SigninFormErrors = {
	username: string | undefined;
	password: string | undefined;
};

export function parseSigninForm(formData: FormData): { signinFormFields: SigninFormFields; signinFormErrors?: SigninFormErrors } {
	const [username, usernameError] = parseSigninUsername(formData.get("username"));
	const [password, passwordError] = parseSigninPassword(formData.get("password"));

	const signinFormFields = {
		username,
		password
	};

	if (usernameError || passwordError) {
		return {
			signinFormFields,
			signinFormErrors: {
				username: usernameError,
				password: passwordError
			}
		};
	}

	return {
		signinFormFields
	};
}

function parseSigninUsername(value: unknown): [string, string | undefined] {
	if (!value) {
		return ["", "Felhasználónév megadása kötelező"];
	}

	if (!isString(value)) {
		return ["", "Felhasználónévnek szövegnek kell lennie"];
	}

	const username = value.trim();

	if (username === "") {
		return ["", "Felhasználónév megadása kötelező"];
	}

	return [username, undefined];
}

function parseSigninPassword(value: unknown): [string, string | undefined] {
	if (!value) {
		return ["", "Jelszó megadása kötelező"];
	}

	if (!isString(value)) {
		return ["", "Jelszónak szövegnek kell lennie"];
	}

	const password = value.trim();

	if (password === "") {
		return ["", "Jelszó megadása kötelező"];
	}
		
	return [password, undefined];
}