import { PrismaClient } from '@prisma/client';

import { IUserRepository } from '../../../../application/repositories/IUserRepository';
import { User } from '../../../../domain/entities/User';

export class PrismaUserRepository implements IUserRepository {
	constructor(private prisma: PrismaClient) {}

	async create(
		userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
	): Promise<User> {
		if (!userData.password) {
			throw new Error('Password is required');
		}
		const user = await this.prisma.user.create({
			data: userData as any // or use Prisma.UserCreateInput if available
		});
		return {
			...user,
			name: user.name ?? '',
			avatar: user.avatar ?? ''
		};
	}

	async findById(id: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: { id }
		});
		return user
			? {
					...user,
					name: user.name ?? '',
					avatar: user.avatar ?? ''
				}
			: null;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: { email }
		});
		return user
			? {
					...user,
					name: user.name ?? '',
					avatar: user.avatar ?? ''
				}
			: null;
	}

	async findAll(): Promise<User[]> {
		const users = await this.prisma.user.findMany();
		return users.map((user) => ({
			...user,
			name: user.name ?? '',
			avatar: user.avatar ?? ''
		}));
	}

	async update(
		id: string,
		userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
	): Promise<User | null> {
		const user = await this.prisma.user.update({
			where: { id },
			data: userData
		});
		return {
			...user,
			name: user.name ?? '',
			avatar: user.avatar ?? ''
		};
	}

	async delete(id: string): Promise<void> {
		await this.prisma.user.delete({
			where: { id }
		});
	}
}
