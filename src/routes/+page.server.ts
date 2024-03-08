import supplierService from "$lib/services/supplierService";
import type { Supplier } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return;
	}

	const suppliers: Supplier[] = await supplierService.getSuppliers();

	if (!locals.user.isAdmin) {
		return {
			suppliers,
		};
	}

	const secretSuppliers: Supplier[] = await supplierService.getSecretSuppliers();

	return {
		suppliers,
		secretSuppliers
	};
}