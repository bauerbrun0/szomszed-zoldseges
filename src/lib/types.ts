export type Product = {
	name: string,
	imagePath: string,
	stock: string,
	price: string,
	origin: string,
}

export type Supplier = {
	name: string,
	person: string,
	email: string,
	phone: string,
	address: string,
}

export type CustomerNeedMessage = {
	username: string,
	userImage: string,
	content: string,
	createdAt: Date,
}