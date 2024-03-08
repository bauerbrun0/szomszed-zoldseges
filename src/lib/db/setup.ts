import { Argon2id } from "oslo/password";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import db from "./";
import { users, nonAdminUsers, adminUsers, suppliers } from "./schema";

const marikasHashedassword = encodeHex(await sha256(new TextEncoder().encode("Password123")));
const jozsiHashedPassword = await new Argon2id().hash("Password123");

// user inserts 
await db.insert(users).values({
	id: "1",
	username: "queen_marika12",
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
	username: "queen_marika12",
	hashedPassword: marikasHashedassword
});

await db.insert(adminUsers).values({
	id: "2",
	username: "jozsef23",
	hashedPassword: jozsiHashedPassword
});

// supplier inserts
await db.insert(suppliers).values({
    id: "1",
    name: "Friss Termény Kft.",
    person: "Tamás Zöld",
    email: "tamas.zold@example.com",
    address: "123 Fő utca",
    phone: "123-456-7890",
    secret: false // Non-secret
});

await db.insert(suppliers).values({
    id: "2",
    name: "Bio Farmok Rt.",
    person: "Szilvia Mező",
    email: "szilvia.mezo@example.com",
    address: "456 Tölgy út",
    phone: "456-789-0123",
    secret: false // Non-secret
});

await db.insert(suppliers).values({
    id: "3",
    name: "Zöldkert Szállítók flag{sql_injection_is_bad}",
    person: "Mihály Juhász",
    email: "mihaly.juhasz@example.com",
    address: "789 Érseki út",
    phone: "789-012-3456",
    secret: false // Non-secret
});

await db.insert(suppliers).values({
    id: "4",
    name: "Bio Termelők Kft.",
    person: "Emma Barna",
    email: "emma.barna@example.com",
    address: "321 Fenyő körút",
    phone: "012-345-6789",
    secret: false // Non-secret
});

await db.insert(suppliers).values({
    id: "5",
    name: "Titkos Zöldségek Bt.",
    person: "Gergő Zöld",
    email: "gergo.zold@example.com",
    address: "555 Titkos utca",
    phone: "555-555-5555",
    secret: true // Secret
});

await db.insert(suppliers).values({
    id: "6",
    name: "Friss Mező Gazdaságok Kft.",
    person: "Emma Mező",
    email: "emma.mezo@example.com",
    address: "777 Rejtett utca",
    phone: "777-777-7777",
    secret: true // Secret
});

await db.insert(suppliers).values({
    id: "7",
    name: "Üvegház Termesztők Zrt.",
    person: "Olivér Zöld flag{xss_xss_xss}",
    email: "oliver.zold@example.com",
    address: "999 Bizalmas körút",
    phone: "999-999-9999",
    secret: true // Secret
});

await db.insert(suppliers).values({
    id: "8",
    name: "Friss Válogatás Termékek",
    person: "Zsófia Zöld",
    email: "zsofia.zold@example.com",
    address: "111 Rejtett sor",
    phone: "111-222-3333",
    secret: false // Non-secret
});

await db.insert(suppliers).values({
    id: "9",
    name: "Bio Választás Gazdaságok",
    person: "Nándor Mező",
    email: "nandor.mezo@example.com",
    address: "333 Rejtélyes utca",
    phone: "333-444-5555",
    secret: false // Non-secret
});

await db.insert(suppliers).values({
    id: "10",
    name: "Zöldséges Szállítók Kft.",
    person: "Lili Zöld",
    email: "lili.zold@example.com",
    address: "444 Rejtett sor",
    phone: "444-555-6666",
    secret: true // Secret
});
