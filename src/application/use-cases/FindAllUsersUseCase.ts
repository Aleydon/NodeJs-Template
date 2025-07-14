import { User } from '@/domain/entities/User';

import { IUserRepository } from '../repositories/IUserRepository';

export class FindAllUsersUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(): Promise<User[]> {
		const users = await this.userRepository.findAll();
		return users;
	}
}
