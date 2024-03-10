import customerNeedMessageService from "$lib/services/customerNeedMessageService";
import supplierService from "$lib/services/supplierService";
import type { CustomerNeedMessage, Supplier } from "$lib/types";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/auth";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return;
	}

	const suppliers: Supplier[] = await supplierService.getSuppliers();
	const customerNeedMessages: CustomerNeedMessage[] = locals.user.isAdmin ?
		await customerNeedMessageService.getCustomerNeedMessages() :
		await customerNeedMessageService.getFilteredCustomerNeedMessages(locals.user.id, locals.session?.id!);

	if (!locals.user.isAdmin) {
		return {
			suppliers,
			customerNeedMessages
		};
	}

	const secretSuppliers: Supplier[] = await supplierService.getSecretSuppliers();

	return {
		suppliers,
		secretSuppliers,
		customerNeedMessages
	};
}

export const actions: Actions = {
	message: async({ locals, request }) => {
		if (!locals.session || !locals.user) {
			return fail(401);
		}

		const formData = await request.formData();
		const content = formData.get("content") as string;

		await customerNeedMessageService.addCustomerNeedMessage(locals.user.id, content, locals.session.id);
	}
};