import { User } from '@prisma/client';

import { IUserRepository } from '../repositories/IUserRepository';

interface CreateUserRequest {
	name: string;
	email: string;
	password?: string;
	avatar?: string;
}

export class CreateUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(data: CreateUserRequest): Promise<User> {
		const user = await this.userRepository.create(data);
		return {
			...user,
			avatar: user.avatar === undefined ? null : user.avatar,
			password: user.password ?? ''
		};
	}
}
