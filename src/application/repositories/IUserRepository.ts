import { User } from '../../domain/entities/User';

export interface IUserRepository {
	create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findAll(): Promise<User[]>;
	update(
		id: string,
		user: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
	): Promise<User | null>;
	delete(id: string): Promise<void>;
}
