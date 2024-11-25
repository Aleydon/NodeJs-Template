import express, { type Request, type Response } from 'express';

const app = express();

const port = 3001;

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server runing on localhost://${port}`);
});
