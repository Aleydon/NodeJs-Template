import { User } from '../../domain/entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

interface UpdateUserRequest {
	name?: string;
	email?: string;
	password?: string;
	avatar?: string;
}

export class UpdateUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(id: string, data: UpdateUserRequest): Promise<User | null> {
		const user = await this.userRepository.update(id, data);
		return user;
	}
}
