import * as dotenv from "dotenv";
import type { HtmlConfig } from "md-to-pdf/dist/lib/config";
dotenv.config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const NEWS_PDF_DIR = process.env.NEWS_PDF_DIR;

if (!DB_CONNECTION_STRING) {
	throw new Error("DB_CONNECTION_STRING is not defined");
}

if (!NEWS_PDF_DIR) {
	throw new Error("NEWS_PDF_DIR is not defined");
}

const MD_TO_PDF_OPTIONS = {
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
} satisfies Partial<HtmlConfig>;

export default {
	DB_CONNECTION_STRING,
	NEWS_PDF_DIR,
	MD_TO_PDF_OPTIONS
}