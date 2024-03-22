import config from "$lib/configs/app.config";
import path from "node:path";
import fs from "node:fs/promises";
import { error } from '@sveltejs/kit';

export async function GET({ params: { id }, locals }) {
	if (!locals.user) {
		throw error(403);
	}

	const filePath = path.resolve(config.NEWS_PDF_DIR, `${id}.pdf`);
	
	try {
		const pdf = await fs.readFile(filePath);
		return new Response(pdf);
	} catch (e) {
		throw error(404);
	}
}