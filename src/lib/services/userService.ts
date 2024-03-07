import { type User, adminUsers } from "$lib/db/schema";
import db from "$lib/db";
import { Argon2id } from "oslo/password";
import { eq } from "drizzle-orm";
import { InvalidCredentialsError } from "$lib/utils/errors";

async function signinAdmin(username: string, password: string): Promise<Omit<User, "hashedPassword">> {
	const results = await db
		.select()
		.from(adminUsers)
		.where(eq(adminUsers.username, username.toLowerCase()));
	
	if (results.length === 0) {
		throw new InvalidCredentialsError();
	}

	const user = results[0];
	const validPassword = await new Argon2id().verify(user.hashedPassword, password);

	if (!validPassword) {
		throw new InvalidCredentialsError();
	}

	return {
		id: user.id,
		username: user.username,
		isAdmin: true,
	};
}

const userService = {
	signinAdmin,
};

export default userService;