import db from "$lib/db";
import type { CustomerNeedMessage } from "$lib/types";
import { customerNeeds, users } from "$lib/db/schema";
import { eq, isNull, ne, or } from "drizzle-orm";
import logger from "$lib/utils/logger";

async function getFilteredCustomerNeedMessages(userId: string, session_id: string): Promise<CustomerNeedMessage[]> {
	try {
		const results = await db
			.select({
				username: users.username,
				userImage: users.image,
				content: customerNeeds.content,
				createdAt: customerNeeds.createdAt
			})
			.from(customerNeeds)
			.innerJoin(users, eq(customerNeeds.userId, users.id))
			.where(or(
				ne(customerNeeds.userId, userId),
				isNull(customerNeeds.sessionId),
				eq(customerNeeds.sessionId, session_id)
			))
			.orderBy(customerNeeds.createdAt);
			
		return results;
	} catch (e: unknown) {
		// superhuman error handling
		console.error(e);
		return [];
	}
}

async function getCustomerNeedMessages(): Promise<CustomerNeedMessage[]> {
	try {
		const results = await db
			.select({
				username: users.username,
				userImage: users.image,
				content: customerNeeds.content,
				createdAt: customerNeeds.createdAt
			})
			.from(customerNeeds)
			.innerJoin(users, eq(customerNeeds.userId, users.id))
			.orderBy(customerNeeds.createdAt);
			
		return results;
	} catch (e: unknown) {
		// superhuman error handling
		console.error(e);
		return [];
	}
}

async function addCustomerNeedMessage(userId: string, content: string, sessionId: string | null = null): Promise<void> {
	try {
		await db.insert(customerNeeds).values({
			userId,
			createdAt: new Date(),
			content,
			sessionId
		});
	} catch (e: unknown) {
		console.error(e);
	}
	logger.info(`New message`, { content, userId, sessionId });
}

const customerNeedMessageService = {
	getFilteredCustomerNeedMessages,
	getCustomerNeedMessages,
	addCustomerNeedMessage
};

export default customerNeedMessageService;