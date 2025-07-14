import { User } from '../../domain/entities/User';
import { UpdateUserRequest, UpdateUserSchema } from '../dtos/user-dtos';
import { IUserRepository } from '../repositories/IUserRepository';

export class UpdateUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(
		id: string,
		{ name, email, password, avatar }: UpdateUserRequest
	): Promise<User | null> {
		UpdateUserSchema.parse({
			name,
			email,
			password
		});
		const user = await this.userRepository.update(id, {
			name,
			email,
			password,
			avatar: avatar ? avatar : undefined
		});
		return user;
	}
}
