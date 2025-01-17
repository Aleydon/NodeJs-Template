import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { UserModel } from '@models/user.model';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;
const { name }: UserModel = new UserModel('Aleydon', 29);

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log(`Server runing on localhost://${PORT}, ${name}`);
});
