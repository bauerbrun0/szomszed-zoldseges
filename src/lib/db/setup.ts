import config from "$lib/configs/app.config";
import { Argon2id } from "oslo/password";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import db from "./";
import { users, nonAdminUsers, adminUsers, suppliers, customerNeeds, news } from "./schema";
import { mdToPdf } from "md-to-pdf";

// user inserts
console.log("Inserting users...");

const marikasHashedassword = encodeHex(await sha256(new TextEncoder().encode("Password123")));
const jozsiHashedPassword = await new Argon2id().hash("Password123");

await db.insert(users).values({
	id: "1",
	username: "queen_marika12",
	hashedPassword: marikasHashedassword,
	isAdmin: false,
	image: "https://i.pravatar.cc/150?img=47"
});

await db.insert(users).values({
	id: "2",
	username: "jozsef23",
	hashedPassword: jozsiHashedPassword,
	isAdmin: true,
	image: "https://i.pravatar.cc/150?img=3"
});

await db.insert(nonAdminUsers).values({
	id: "1",
	username: "queen_marika12",
	hashedPassword: marikasHashedassword,
	image: "https://i.pravatar.cc/150?img=47"
});

await db.insert(adminUsers).values({
	id: "2",
	username: "jozsef23",
	hashedPassword: jozsiHashedPassword,
	image: "https://i.pravatar.cc/150?img=3"
});

// supplier inserts
console.log("Inserting suppliers...");

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

// customer need inserts
console.log("Inserting customer needs...");

await db.insert(customerNeeds).values({
	userId: "1",
	createdAt: new Date(),
	content: "Kevés a káposzta.",
});

await db.insert(customerNeeds).values({
	userId: "1",
	createdAt: new Date(),
	content: "Nem elég <strong>friss</strong> a zöldpaprika.",
});

await db.insert(customerNeeds).values({
	userId: "1",
	createdAt: new Date(),
	content: "Büdös a krumpli.",
	sessionId: "filtered_session_id"
});

await db.insert(customerNeeds).values({
	userId: "2",
	createdAt: new Date(),
	content: "Vettem az adást!",
});

// news inserts
console.log("Inserting news...");

const news1 = `
# Új Szezonális Zöldségek Megérkeztek!

![Szezonális Zöldségek](https://img.freepik.com/free-photo/fresh-apples-supermarket_1303-16018.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709424000&semt=ais)

Nagy örömmel jelentjük be, hogy fantasztikus szezonális zöldségek érkeztek zöldségesünkhöz! A ropogós almától a vibráló kelkáposztáig, remek választékkal várunk, hogy ízleljék a különlegességeket. Néhány kiemelt termékünk:

- **Alma**: Ropogós, lédús és tele ízzel, almáink tökéletesek nasiként vagy finom süteményekbe sütve.
- **Kelkáposzta**: Tele tápanyaggal és ízzel, friss kelkáposzta bármilyen levesbe, salátába vagy wokba kiváló.
- **Répa**: Édes és ropogós, répáink nélkülözhetetlenek bármely konyhában. Fogyasszák nyersen vagy főzve kedvenc ételeikben.
- **Spenót**: Tápanyagokban gazdag és finom, spenótunk ideális salátákhoz, smoothiekhez vagy párolt ételekhez.

Gyertek és szerezzenek be néhányat ezekből a finom szezonális csemegékből még ma!
`;

const news2 = `
# Különleges Kedvezmények Helyi Iskoláknak és Szervezeteknek!

Nagy örömmel jelentjük be a helyi iskoláknak és szervezeteknek szóló különleges kedvezményprogramunkat! Hiszünk a közösség támogatásában, és mi lehetne jobb módja annak, mint friss, egészséges zöldségek kedvezményes áron való kínálata?

## Kedvezmény Részletek:

| Szervezet neve    | Kedvezmény mértéke |
|-|-|
| Állami Iskola 1   | 15%                |
| Városi Óvoda 2    | 10%                |
| Ifjúsági Csoport  | 20%                |
| Karitatív Alapítvány | 25%              |

Várjuk szeretettel minden helyi iskola és szervezet jelentkezését a kedvezmények igénylésére!
`;

const news3 = `
# Kiterjesztett Nyitvatartás!

Örömmel jelentjük be, hogy jövő héttől kezdve kiterjesztjük üzletünk nyitvatartási idejét, hogy jobban szolgálhassuk vásárlóinkat! Íme az új nyitvatartási idők:

| Napok            | Nyitvatartás   |
|------------------|----------------|
| Hétfő - Péntek   | 8:00 - 20:00   |
| Szombat          | 9:00 - 18:00   |
| Vasárnap         | 10:00 - 16:00  |

Ezekkel a kiterjesztett nyitvatartási időkkel több rugalmasságot biztosítunk számodra, hogy kényelmesen vásárolhass kedvenc gyümölcsöidet és zöldségeidet. Alig várjuk, hogy láthassunk az új nyitvatartási időink alatt!
`;


await db.insert(news).values({
	id: "8fbe5240-cd8f-4968-b3ce-9d821a4e083a",
	name: "Új Szezonális Zöldségek - 2023.09.01",
	createdAt: new Date(),
	content: news1
});

await db.insert(news).values({
	id: "5011a884-34fa-4ffa-838f-7663073deb29",
	name: "Különleges Kedvezmények Helyi Iskoláknak és Szervezeteknek - 2024.02.10",
	createdAt: new Date(),
	content: news2
});

await db.insert(news).values({
	id: "2b1d458d-98c9-46f5-ad42-f20b64ed2f26",
	name: "Új nyitvatartás - 2024.03.03",
	createdAt: new Date(),
	content: news3
});

console.log("Creating news PDFs...");
try {
	await mdToPdf({ content: news1 }, {
		dest: `${config.NEWS_PDF_DIR}/8fbe5240-cd8f-4968-b3ce-9d821a4e083a.pdf`,
		...config.MD_TO_PDF_OPTIONS
	});
	
	await mdToPdf({ content: news2 }, {
		dest: `${config.NEWS_PDF_DIR}/5011a884-34fa-4ffa-838f-7663073deb29.pdf`,
		...config.MD_TO_PDF_OPTIONS
	});

	await mdToPdf({ content: news3 }, {
		dest: `${config.NEWS_PDF_DIR}/2b1d458d-98c9-46f5-ad42-f20b64ed2f26.pdf`,
		...config.MD_TO_PDF_OPTIONS
	});
} catch (error) {
	console.log("Error creating PDFs during db setup", error);
	console.error(error);
}

