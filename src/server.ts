import express, { type Request, type Response } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json';
import cors from 'cors';

import { prisma } from './config/prisma';
import { route } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = new URL('.', import.meta.url).pathname;

async function main() {
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(route);
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
	app.use(
		'/profile-image',
		express.static(path.join(__dirname, '..', 'uploads'))
	);

	app.all('*', (req: Request, res: Response) => {
		res.status(404).json({ error: `Route ${req.originalUrl} not found` });
	});

	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
	});
}

main()
	.then(async () => {
		await prisma.$connect();
	})
	.catch(async (e: Error) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
