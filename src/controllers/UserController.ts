import { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';

import { prisma } from '@/config/prisma';

export class UserController {
	async index(req: Request, res: Response) {
		const users = await prisma.user.findMany();
		if (!users) {
			return res.status(404).json({ error: 'No users found' });
		}

		try {
			const users = await prisma.user.findMany();
			return res.status(200).json({ users });
		} catch (error) {
			console.warn(error);
		}
	}

	async create(req: Request, res: Response) {
		const { name, email, password } = req.body;
		const avatar = req.file;
		const hashedPassword = await bcrypt.hash(password, 10);

		const userExists = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (userExists) {
			return res.status(400).json({ error: 'User already exists' });
		}

		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ error: 'Name, email and password are required' });
		}
		try {
			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
					avatar: avatar ? avatar.filename : null
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
