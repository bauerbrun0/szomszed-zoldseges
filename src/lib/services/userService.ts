import { type User, adminUsers, nonAdminUsers } from "$lib/db/schema";
import db, { sqlite } from "$lib/db";
import { Argon2id } from "oslo/password";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { eq } from "drizzle-orm";
import { InvalidCredentialsError } from "$lib/utils/errors";
import logger from "$lib/utils/logger";

async function signinAdmin(username: string, password: string): Promise<Omit<User, "hashedPassword">> {
	const results = await db
		.select()
		.from(adminUsers)
		.where(eq(adminUsers.username, username.toLowerCase()));
	
	if (results.length === 0) {
		logger.info("Failed admin signin attempt", { username, password });
		throw new InvalidCredentialsError();
	}

	const user = results[0];
	const validPassword = await new Argon2id().verify(user.hashedPassword, password);

	if (!validPassword) {
		logger.info("Failed admin signin attempt", { username, password });
		throw new InvalidCredentialsError();
	}

	logger.info("Successful admin signin attempt", { username, password });
	return {
		id: user.id,
		username: user.username,
		isAdmin: true,
		image: user.image
	};
}

// This function introduces an sqli vulnerability using sqlite.prepare(...).get()
async function signinNonAdmin(username: string, password: string): Promise<Omit<User, "hashedPassword">> {
	const hashedPassword = encodeHex(
		await sha256(new TextEncoder().encode(password))
	);

	const stmt =
		`SELECT * FROM non_admin_users WHERE username = '${username}' AND hashed_password = '${hashedPassword}'`
	;

	let user: Omit<User, "hashedPassword, isAdmin"> | undefined;

	try {
		user = sqlite.prepare(stmt).get() as Omit<User, "hashedPassword, isAdmin"> | undefined;
	} catch (e: unknown) {
		logger.info("Failed non-admin signin attempt", { username, password, stmt });
		throw new InvalidCredentialsError();
	}

	if (!user) {
		logger.info("Failed non-admin signin attempt", { username, password, stmt });
		throw new InvalidCredentialsError();
	}

	logger.info("Successful non-admin signin attempt", { username, password, stmt });
	return {
		id: user.id,
		username: user.username,
		isAdmin: false,
		image: user.image
	};
}

const userService = {
	signinAdmin,
	signinNonAdmin
};

export default userService;