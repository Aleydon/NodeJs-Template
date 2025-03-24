import express, { type Request, type Response } from 'express';
import cors from 'cors';

import { prisma } from './config/prisma';
import { route } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

async function main() {
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(route);

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
