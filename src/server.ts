import cors from 'cors';
import express, { type Request, type Response } from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';

import { prisma } from './config/prisma';
import { route } from './routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerFile = JSON.parse(
	fs.readFileSync(path.join(__dirname, '..', 'swagger-output.json'), 'utf8')
);

const app = express();
const PORT = process.env.PORT || 3333;

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

	app.all('/{*any}', (req: Request, res: Response) => {
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
