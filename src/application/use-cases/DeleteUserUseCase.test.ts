import { IUserRepository } from '../repositories/IUserRepository';
import { DeleteUserUseCase } from './DeleteUserUseCase';

describe('DeleteUserUseCase', () => {
	let deleteUserUseCase: DeleteUserUseCase;
	let userRepository: jest.Mocked<IUserRepository>;

	beforeEach(() => {
		userRepository = {
			create: jest.fn(),
			findById: jest.fn(),
			findByEmail: jest.fn(),
			findAll: jest.fn(),
			update: jest.fn(),
			delete: jest.fn()
		};
		deleteUserUseCase = new DeleteUserUseCase(userRepository);
	});

	it('should delete a user', async () => {
		const userId = '123';
		userRepository.delete.mockResolvedValue(undefined);

		await deleteUserUseCase.execute(userId);

		expect(userRepository.delete).toHaveBeenCalledWith(userId);
	});

	it('should throw an error if user deletion fails', async () => {
		const userId = '123';
		userRepository.delete.mockRejectedValue(new Error('Failed to delete user'));

		await expect(deleteUserUseCase.execute(userId)).rejects.toThrow(
			'Failed to delete user'
		);
	});
});
