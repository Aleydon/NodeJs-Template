import { IUserRepository } from '../repositories/IUserRepository';
import { FindUserByIdUseCase } from './FindUserByIdUseCase';

describe('FindUserByIdUseCase', () => {
	let findUserByIdUseCase: FindUserByIdUseCase;
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
		findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
	});

	it('should return a user by ID', async () => {
		const userId = '123';
		const user = {
			id: userId,
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
			avatar: undefined,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		userRepository.findById.mockResolvedValue(user);

		const result = await findUserByIdUseCase.execute(userId);

		expect(userRepository.findById).toHaveBeenCalledWith(userId);
		expect(result).toEqual(user);
	});

	it('should return null if user is not found', async () => {
		const userId = '123';
		userRepository.findById.mockResolvedValue(null);

		const result = await findUserByIdUseCase.execute(userId);

		expect(userRepository.findById).toHaveBeenCalledWith(userId);
		expect(result).toBeNull();
	});

	it('should throw an error if fetching user fails', async () => {
		const userId = '123';
		userRepository.findById.mockRejectedValue(
			new Error('Failed to fetch user')
		);

		await expect(findUserByIdUseCase.execute(userId)).rejects.toThrow(
			'Failed to fetch user'
		);
	});
});
