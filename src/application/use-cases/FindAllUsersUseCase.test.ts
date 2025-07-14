import { IUserRepository } from '../repositories/IUserRepository';
import { FindAllUsersUseCase } from './FindAllUsersUseCase';

describe('FindAllUsersUseCase', () => {
	let findAllUsersUseCase: FindAllUsersUseCase;
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
		findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
	});

	it('should return all users', async () => {
		const users = [
			{
				id: '1',
				name: 'John Doe',
				email: 'john.doe@example.com',
				password: 'password123',
				avatar: undefined,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: '2',
				name: 'Jane Doe',
				email: 'jane.doe@example.com',
				password: 'password123',
				avatar: undefined,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		];

		userRepository.findAll.mockResolvedValue(users);

		const result = await findAllUsersUseCase.execute();

		expect(userRepository.findAll).toHaveBeenCalled();
		expect(result).toEqual(users);
	});

	it('should return an empty array if no users are found', async () => {
		userRepository.findAll.mockResolvedValue([]);

		const result = await findAllUsersUseCase.execute();

		expect(userRepository.findAll).toHaveBeenCalled();
		expect(result).toEqual([]);
	});

	it('should throw an error if fetching users fails', async () => {
		userRepository.findAll.mockRejectedValue(
			new Error('Failed to fetch users')
		);

		await expect(findAllUsersUseCase.execute()).rejects.toThrow(
			'Failed to fetch users'
		);
	});
});
