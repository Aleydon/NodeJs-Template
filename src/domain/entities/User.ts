export interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	password?: string;
	createdAt: Date;
	updatedAt: Date;
}
