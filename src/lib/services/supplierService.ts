import db from "$lib/db";
import type { Supplier } from "$lib/types";
import { suppliers } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import logger from "$lib/utils/logger";

async function getSuppliers(): Promise<Supplier[]> {
	try {
		const result: Supplier[] = await db
			.select({
				name: suppliers.name,
				person: suppliers.person,
				email: suppliers.email,
				address: suppliers.address,
				phone: suppliers.phone
			})
			.from(suppliers)
			.where(eq(suppliers.secret, false));
		
		return result;
	} catch (e: unknown) {
		logger.error("Service error", { service: "supplierService", function: "getSuppliers", error: e });
		return [];
	}
}

async function getSecretSuppliers(): Promise<Supplier[]> {
	try {
		const result: Supplier[] = await db
			.select({
				name: suppliers.name,
				person: suppliers.person,
				email: suppliers.email,
				address: suppliers.address,
				phone: suppliers.phone
			})
			.from(suppliers)
			.where(eq(suppliers.secret, true));

		return result;
	} catch (e: unknown) {
		logger.error("Service error", { service: "supplierService", function: "getSecretSuppliers", error: e });
		return [];
	}
}

const supplierService = {
	getSuppliers,
	getSecretSuppliers
};

export default supplierService;