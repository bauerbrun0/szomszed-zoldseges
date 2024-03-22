import type { News } from "$lib/db/schema";
import newsService from "$lib/services/newsService";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params: { id } }) => {
	const news: News | null = await newsService.getNewsById(id);

	if (!news) {
		throw error(404, { message: "Nem található a hír." , code: 404 });
	}

	return {
		news
	};
}