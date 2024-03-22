import winston from "winston";

const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: "app.log", level: "info" })
	]
});

if (process.env.NODE_ENV !== "production") {
	console.log("Logging to console in development mode");
	logger.add(new winston.transports.Console({
		format: winston.format.simple()
	}));
}

export default logger;