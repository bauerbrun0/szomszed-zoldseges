import type { News } from "$lib/db/schema";
import customerNeedMessageService from "$lib/services/customerNeedMessageService";
import newsService from "$lib/services/newsService";
import supplierService from "$lib/services/supplierService";
import type { CustomerNeedMessage, Supplier } from "$lib/types";
import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
	const news: News[] = await newsService.getNews();

	if (!locals.user) {
		return {
			news
		};
	}

	const suppliers: Supplier[] = await supplierService.getSuppliers();
	const customerNeedMessages: CustomerNeedMessage[] = locals.user.isAdmin ?
		await customerNeedMessageService.getCustomerNeedMessages() :
		await customerNeedMessageService.getFilteredCustomerNeedMessages(locals.user.id, locals.session?.id!);

	if (!locals.user.isAdmin) {
		return {
			news,
			suppliers,
			customerNeedMessages
		};
	}

	const secretSuppliers: Supplier[] = await supplierService.getSecretSuppliers();

	return {
		news,
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
		// todo parsing
		const content = formData.get("content") as string;

		await customerNeedMessageService.addCustomerNeedMessage(locals.user.id, content, locals.session.id);
	},
	news: async({ locals, request }) => {
		if (!locals.session || !locals.user) {
			return fail(401);
		}

		const formData = await request.formData();
		// todo parsing
		const name = formData.get("name") as string;
		const content = formData.get("content") as string;

		await newsService.createNews(name, content);
	},
};