import { type Request, type Response, Router } from 'express';
import multer from 'multer';

import { multerConfig } from './config/multer';
import { UserController } from './controllers/UserController';

const route = Router();

const upload = multer(multerConfig);
const userController = new UserController();

route.get('/users', (req: Request, res: Response) => {
	userController.index(req, res);
});

route.post('/users', upload.single('avatar'), (req: Request, res: Response) => {
	userController.create(req, res);
});

route.put('/users/:id', (req: Request, res: Response) => {
	userController.update(req, res);
});

route.delete('/users/:id', (req: Request, res: Response) => {
	userController.delete(req, res);
});

export { route };
