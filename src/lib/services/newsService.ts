import config from "$lib/configs/app.config";
import db from "$lib/db";
import { news, type News } from "$lib/db/schema";
import logger from "$lib/utils/logger";
import { eq } from "drizzle-orm";
import { mdToPdf } from "md-to-pdf";

const commentRegexWithJs = /---(?!js).*?---/gs;
const commentRegex = /---.*?---/gs;

async function createNews(name: string, content: string): Promise<void> {
	// Remove comments from the markdown content, keep ---js comments for md-to-pdf
	const markdownForPdf = content.replace(commentRegexWithJs, "");
	const contentToStore = content.replace(commentRegex, "");

	logger.info("Creating news", { name, content, markdownForPdf, contentToStore });

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
			dest: `${config.NEWS_PDF_DIR}/${res.id}.pdf`,
			...config.MD_TO_PDF_OPTIONS
		});
		logger.info("News created", { id: res.id, name, content, markdownForPdf, contentToStore });
	} catch (error) {
		// can't get to work tx.rollback(), so there's go transaction
		await db.delete(news).where(eq(news.id, res.id));
		logger.error("Service error", { service: "newsService", function: "createNews", error });
		throw error;
	}
}

async function getNews(): Promise<News[]> {
	try {
		return await db.select().from(news);
	} catch (error) {
		logger.error("Service error", { service: "newsService", function: "getNews", error });
		return [];
	}
}

async function getNewsById(id: string): Promise<News | null> {
	try {
		const [res] = await db.select().from(news).where(eq(news.id, id));
		return res;
	} catch (error) {
		logger.error("Service error", { service: "newsService", function: "getNewsById", error });
		return null;
	}
}

const newsService = {
	createNews,
	getNews,
	getNewsById
};

export default newsService;