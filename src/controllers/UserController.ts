import { type Request, type Response } from 'express';

import { prisma } from '@/config/prisma';

export class UserController {
	async index(req: Request, res: Response) {
		try {
			const users = await prisma.user.findMany();
			return res.status(200).json({ users });
		} catch (error) {
			console.warn(error);
		}
	}

	async create(req: Request, res: Response) {
		const { name, email } = req.body;
		try {
			const user = await prisma.user.create({
				data: {
					name,
					email
				}
			});
			return res.status(201).json({ user });
		} catch (error) {
			console.warn(error);
		}
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { name } = req.body;
		try {
			const user = await prisma.user.update({
				where: {
					id
				},
				data: {
					name
				}
			});
			return res.status(200).json({ user });
		} catch (error) {
			console.warn(error);
		}
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await prisma.user.delete({
				where: {
					id
				}
			});
			return res.status(200).send('User deleted');
		} catch (error) {
			console.warn(error);
		}
	}
}
