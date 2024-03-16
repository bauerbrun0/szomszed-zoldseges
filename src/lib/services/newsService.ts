import db from "$lib/db";
import { news, type News } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import { mdToPdf } from "md-to-pdf";

const commentRegexWithJs = /---(?!js).*?---/gs;
const commentRegex = /---.*?---/gs;

async function createNews(name: string, content: string): Promise<void> {
	// Remove comments from the markdown content, keep ---js comments for md-to-pdf
	const markdownForPdf = content.replace(commentRegexWithJs, "");
	const contentToStore = content.replace(commentRegex, "");

	const [res] = await db
		.insert(news)
		.values({
			createdAt: new Date(),
			name,
			content: contentToStore,
		})
		.returning({ id: news.id });

	try {
		await mdToPdf({ content: markdownForPdf }, {
			dest: `./pdfs/news/${res.id}.pdf`,
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
		// can't get to work tx.rollback(), so there's go transaction
		await db.delete(news).where(eq(news.id, res.id));
		throw error;
	}
}

async function getNews(): Promise<News[]> {
	try {
		return await db.select().from(news);
	} catch (error) {
		return [];
	}
}

async function getNewsById(id: string): Promise<News | null> {
	try {
		const [res] = await db.select().from(news).where(eq(news.id, id));
		return res;
	} catch (error) {
		return null;
	}
}

const newsService = {
	createNews,
	getNews,
	getNewsById
};

export default newsService;