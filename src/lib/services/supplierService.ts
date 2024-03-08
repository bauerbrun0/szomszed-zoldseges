import db from "$lib/db";
import type { Supplier } from "$lib/types";
import { suppliers } from "$lib/db/schema";
import { eq } from "drizzle-orm";

async function getSuppliers(): Promise<Supplier[]> {
	try {
		const results = await db.select().from(suppliers).where(eq(suppliers.secret, false));
		const result: Supplier[] = results.map(s => ({
			name: s.name, person: s.person, email: s.email, address: s.address, phone: s.phone
		}));

		return result;
	} catch (e: unknown) {
		return [];
	}
}

async function getSecretSuppliers(): Promise<Supplier[]> {
	try {
		const results = await db.select().from(suppliers).where(eq(suppliers.secret, true));
		const result: Supplier[] = results.map(s => ({
			name: s.name, person: s.person, email: s.email, address: s.address, phone: s.phone
		}));

		return result;
	} catch (e: unknown) {
		return [];
	}
}

const supplierService = {
	getSuppliers,
	getSecretSuppliers
};

export default supplierService;