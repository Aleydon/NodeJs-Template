import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
		version: '1.0.0',
		title: 'User Management API',
		description: 'API for managing users, including CRUD operations.'
	},
	host: 'localhost:3333',
	basePath: '/',
	schemes: ['http'],
	consumes: ['application/json', 'multipart/form-data'],
	produces: ['application/json'],
	tags: [
		{
			name: 'Users',
			description: 'User management endpoints'
		}
	],
	securityDefinitions: {},
	definitions: {
		User: {
			type: 'object',
			properties: {
				id: { type: 'string', example: 'clx0123456789abcdefghijk' },
				name: { type: 'string', example: 'John Doe' },
				email: {
					type: 'string',
					format: 'email',
					example: 'john.doe@example.com'
				},
				password: { type: 'string', example: 'hashedpassword' },
				avatar: { type: 'string', example: 'avatar.jpg' },
				createdAt: { type: 'string', format: 'date-time' },
				updatedAt: { type: 'string', format: 'date-time' }
			}
		},
		CreateUserRequest: {
			type: 'object',
			required: ['name', 'email', 'password'],
			properties: {
				name: { type: 'string', example: 'John Doe' },
				email: {
					type: 'string',
					format: 'email',
					example: 'john.doe@example.com'
				},
				password: {
					type: 'string',
					format: 'password',
					example: 'password123'
				},
				avatar: { type: 'string', format: 'binary' }
			}
		},
		UpdateUserRequest: {
			type: 'object',
			properties: {
				name: { type: 'string', example: 'John Doe Updated' },
				email: {
					type: 'string',
					format: 'email',
					example: 'john.doe.updated@example.com'
				},
				password: {
					type: 'string',
					format: 'password',
					example: 'newpassword123'
				}
			}
		}
	}
};

const outputFile = './swagger-output.json';
const routes = ['./src/infrastructure/http/routes/user.routes.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
