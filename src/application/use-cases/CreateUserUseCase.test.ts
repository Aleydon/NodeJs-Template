import { IUserRepository } from '../repositories/IUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('CreateUserUseCase', () => {
	let createUserUseCase: CreateUserUseCase;
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
		createUserUseCase = new CreateUserUseCase(userRepository);
	});

	it('should create a new user', async () => {
		const userData = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123'
		};

		userRepository.create.mockResolvedValue({
			id: '1',
			name: userData.name,
			email: userData.email,
			password: userData.password,
			avatar: undefined,
			createdAt: new Date(),
			updatedAt: new Date()
		});

		const user = await createUserUseCase.execute(userData);

		expect(userRepository.create).toHaveBeenCalledWith(userData);
		expect(user).toHaveProperty('id');
		expect(user.name).toBe(userData.name);
		expect(user.email).toBe(userData.email);
	});

	it('should throw an error if user creation fails', async () => {
		const userData = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123'
		};

		userRepository.create.mockRejectedValue(new Error('Failed to create user'));

		await expect(createUserUseCase.execute(userData)).rejects.toThrow(
			'Failed to create user'
		);
	});
});
