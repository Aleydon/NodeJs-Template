import { User } from '@/domain/entities/User';

import { IUserRepository } from '../repositories/IUserRepository';

export class FindUserByIdUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(id: string): Promise<User | null> {
		const user = await this.userRepository.findById(id);
		return user;
	}
}
