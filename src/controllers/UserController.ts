import { type Request, type Response } from 'express';

import { CreateUserUseCase } from '@/application/use-cases/CreateUserUseCase';
import { DeleteUserUseCase } from '@/application/use-cases/DeleteUserUseCase';
import { FindAllUsersUseCase } from '@/application/use-cases/FindAllUsersUseCase';
import { FindUserByIdUseCase } from '@/application/use-cases/FindUserByIdUseCase';
import { UpdateUserUseCase } from '@/application/use-cases/UpdateUserUseCase';

export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly findAllUsersUseCase: FindAllUsersUseCase,
		private readonly findUserByIdUseCase: FindUserByIdUseCase,
		private readonly updateUserUseCase: UpdateUserUseCase,
		private readonly deleteUserUseCase: DeleteUserUseCase
	) {}

	async index(req: Request, res: Response) {
		try {
			const users = await this.findAllUsersUseCase.execute();
			return res.status(200).json({ users });
		} catch (error) {
			console.warn(error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	}

	async create(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const avatar = req.file;

		try {
			const user = await this.createUserUseCase.execute({
				name,
				email,
				password,
				avatar: avatar ? avatar.filename : undefined
			});
			return res.status(201).json({ user });
		} catch (error: any) {
			console.warn(error);
			return res.status(400).json({ error: error.message });
		}
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { name, email, password } = req.body;
		try {
			const user = await this.updateUserUseCase.execute(id, {
				name,
				email,
				password
			});
			return res.status(200).json({ user });
		} catch (error: any) {
			console.warn(error);
			return res.status(400).json({ error: error.message });
		}
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await this.deleteUserUseCase.execute(id);
			return res.status(200).send('User deleted');
		} catch (error: any) {
			console.warn(error);
			return res.status(400).json({ error: error.message });
		}
	}

	async show(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const user = await this.findUserByIdUseCase.execute(id);
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
			return res.status(200).json({ user });
		} catch (error: any) {
			console.warn(error);
			return res.status(400).json({ error: error.message });
		}
	}
}
