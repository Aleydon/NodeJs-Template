import { z } from 'zod';

export const CreateUserSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.email('Invalid email format'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	avatar: z.string().optional().nullable()
});

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
	name: z.string().min(1, 'Name is required').optional(),
	email: z.email('Invalid email format').optional(),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.optional(),
	avatar: z.string().optional().nullable()
});

export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
