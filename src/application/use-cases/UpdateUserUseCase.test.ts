import { IUserRepository } from '../repositories/IUserRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';

describe('UpdateUserUseCase', () => {
	let updateUserUseCase: UpdateUserUseCase;
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
		updateUserUseCase = new UpdateUserUseCase(userRepository);
	});

	it('should update a user', async () => {
		const userId = '123';
		const updateData = {
			name: 'John Doe Updated',
			email: 'john.doe.updated@example.com'
		};
		const updatedUser = {
			id: userId,
			name: updateData.name,
			email: updateData.email,
			password: 'password123',
			avatar: undefined,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		userRepository.update.mockResolvedValue(updatedUser);

		const result = await updateUserUseCase.execute(userId, updateData);

		expect(userRepository.update).toHaveBeenCalledWith(userId, updateData);
		expect(result).toEqual(updatedUser);
	});

	it('should return null if user to update is not found', async () => {
		const userId = '123';
		const updateData = {
			name: 'John Doe Updated'
		};

		userRepository.update.mockResolvedValue(null);

		const result = await updateUserUseCase.execute(userId, updateData);

		expect(userRepository.update).toHaveBeenCalledWith(userId, updateData);
		expect(result).toBeNull();
	});

	it('should throw an error if user update fails', async () => {
		const userId = '123';
		const updateData = {
			name: 'John Doe Updated'
		};

		userRepository.update.mockRejectedValue(new Error('Failed to update user'));

		await expect(updateUserUseCase.execute(userId, updateData)).rejects.toThrow(
			'Failed to update user'
		);
	});
});
