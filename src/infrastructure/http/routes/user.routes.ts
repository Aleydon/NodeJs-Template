import { Router } from 'express';
import multer from 'multer';

import { CreateUserUseCase } from '@/application/use-cases/CreateUserUseCase';
import { DeleteUserUseCase } from '@/application/use-cases/DeleteUserUseCase';
import { FindAllUsersUseCase } from '@/application/use-cases/FindAllUsersUseCase';
import { FindUserByIdUseCase } from '@/application/use-cases/FindUserByIdUseCase';
import { UpdateUserUseCase } from '@/application/use-cases/UpdateUserUseCase';
import { multerConfig } from '@/config/multer';
import { prisma } from '@/config/prisma';
import { UserController } from '@/controllers/UserController';
import { PrismaUserRepository } from '@/infrastructure/database/prisma/repositories/PrismaUserRepository';

const userRoutes = Router();
const upload = multer(multerConfig);

const userRepository = new PrismaUserRepository(prisma);

const createUserUseCase = new CreateUserUseCase(userRepository);
const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController(
	createUserUseCase,
	findAllUsersUseCase,
	findUserByIdUseCase,
	updateUserUseCase,
	deleteUserUseCase
);

userRoutes.get('/users', (req, res) => userController.index(req, res));

userRoutes.delete('/users/:id', (req, res) => userController.delete(req, res));

userRoutes.get('/users/:id', (req, res) => userController.show(req, res));

export { userRoutes };
