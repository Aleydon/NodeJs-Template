import { User } from '@prisma/client';

import { CreateUserRequest, CreateUserSchema } from '../dtos/user-dtos';
import { IUserRepository } from '../repositories/IUserRepository';

export class CreateUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute({
		name,
		email,
		password,
		avatar
	}: CreateUserRequest): Promise<User> {
		CreateUserSchema.parse({
			name,
			email,
			password,
			avatar
		});

		const user = await this.userRepository.create({
			name,
			email,
			password,
			avatar: avatar ? avatar : undefined
		});
		return {
			...user,
			avatar: user.avatar === undefined ? null : user.avatar,
			password: user.password ?? ''
		};
	}
}
