import db from "$lib/db";
import { news, type News } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import { mdToPdf } from "md-to-pdf";

const commentRegexWithJs = /---(?!js).*?---/gs;
const commentRegex = /---.*?---/gs;

async function createNews(markdown: string): Promise<void> {
	// Remove comments from the markdown content, keep ---js comments for md-to-pdf
	const markdownForPdf = markdown.replace(commentRegexWithJs, "");
	const markdownToStore = markdown.replace(commentRegex, "");

	await db.transaction(async (tx) => {
		const res = await tx
			.insert(news)
			.values({
				createdAt: new Date(),
				content: markdownToStore
			})
			.returning({ id: news.id });
	
		const id = res[0].id;

		try {
			await mdToPdf({ content: markdownForPdf }, {
				dest: `./pdfs/news/${id}.pdf`,
				stylesheet: ["static/pdf.css"],
				pdf_options: {
					format: "A4",
					margin: {
						top: "0mm",
						right: "0mm",
						bottom: "0mm",
						left: "0mm"
					}
				}
			});
		} catch (error) {
			// tx.rollback(); just doesn't work for some reason
			await db.delete(news).where(eq(news.id, id));
			throw error;
		}
	});
}

async function getNews(): Promise<News[]> {
	try {
		return await db.select().from(news);
	} catch (error) {
		return [];
	}
}

const newsService = {
	createNews,
	getNews
};

export default newsService;