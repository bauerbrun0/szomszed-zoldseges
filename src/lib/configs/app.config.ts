import * as dotenv from "dotenv";
import type { HtmlConfig } from "md-to-pdf/dist/lib/config";
dotenv.config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const NEWS_PDF_DIR = process.env.NEWS_PDF_DIR;

const NON_ADMIN_USERNAME = process.env.NON_ADMIN_USERNAME;
const NON_ADMIN_PASSWORD = process.env.NON_ADMIN_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const SQLI_FLAG = process.env.SQLI_FLAG;
const XSS_FLAG = process.env.XSS_FLAG;
const RCE_FLAG= process.env.RCE_FLAG;

if (!DB_CONNECTION_STRING) {
	throw new Error("DB_CONNECTION_STRING is not defined");
}

if (!NEWS_PDF_DIR) {
	throw new Error("NEWS_PDF_DIR is not defined");
}

if (!NON_ADMIN_USERNAME) {
	throw new Error("NON_ADMIN_USERNAME is not defined");
}

if (!NON_ADMIN_PASSWORD) {
	throw new Error("NON_ADMIN_PASSWORD is not defined");
}

if (!ADMIN_USERNAME) {
	throw new Error("ADMIN_USERNAME is not defined");
}

if (!ADMIN_PASSWORD) {
	throw new Error("ADMIN_PASSWORD is not defined");
}

if (!SQLI_FLAG) {
	throw new Error("SQLI_FLAG is not defined");
}

if (!XSS_FLAG) {
	throw new Error("XSS_FLAG is not defined");
}

if (!RCE_FLAG) {
	throw new Error("RCE_FLAG is not defined");
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
	},
	launch_options: {
		args: ["--no-sandbox", "--disable-setuid-sandbox"]
	}
} satisfies Partial<HtmlConfig>;

export default {
	DB_CONNECTION_STRING,
	NEWS_PDF_DIR,
	MD_TO_PDF_OPTIONS,
	NON_ADMIN_USERNAME,
	NON_ADMIN_PASSWORD,
	ADMIN_USERNAME,
	ADMIN_PASSWORD,
	SQLI_FLAG,
	XSS_FLAG,
	RCE_FLAG
}