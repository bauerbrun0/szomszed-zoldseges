import { Argon2id } from "oslo/password";
import db from "./";
import { users, nonAdminUsers, adminUsers } from "./schema";

const marikasHashedassword = await new Argon2id().hash("Password123");
const jozsiHashedPassword = await new Argon2id().hash("Password123");

await db.insert(users).values({
	id: "1",
	username: "marika12",
	hashedPassword: marikasHashedassword,
	isAdmin: false
});

await db.insert(users).values({
	id: "2",
	username: "jozsef23",
	hashedPassword: jozsiHashedPassword,
	isAdmin: true
});

await db.insert(nonAdminUsers).values({
	id: "1",
	username: "marika12",
	hashedPassword: marikasHashedassword
});

await db.insert(adminUsers).values({
	id: "2",
	username: "jozsef23",
	hashedPassword: jozsiHashedPassword
});