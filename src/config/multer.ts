import { Request } from 'express';
import path from 'path';
import multer, { Options } from 'multer';
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;

export const multerConfig = {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'uploads'),
		filename: (req: Request, file, cb) => {
			const ext = path.extname(file.originalname);
			const name = path.basename(file.originalname, ext);

			cb(null, `${name}-${Date.now()}${ext}`);
		}
	}),
	fileFilter: (req: Request, file, cb) => {
		const allowedMimes = [
			'image/jpeg',
			'image/pjpeg',
			'image/png',
			'image/gif'
		];
		if (allowedMimes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error('Invalid file type.'));
		}
	}
} as Options;
