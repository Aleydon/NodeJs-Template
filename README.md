# Node.js Express Template

A robust and scalable Node.js template for building RESTful APIs with Express, TypeScript, Prisma, and more.

## Features

- **Clean Architecture:** Organized codebase with clear separation of concerns (Domain, Application, Infrastructure, Presentation).
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript:** Typed superset of JavaScript that compiles to plain JavaScript.
- **Prisma:** Next-generation ORM for Node.js and TypeScript.
- **Zod:** TypeScript-first schema validation with static type inference, integrated into Use Cases.
- **PostgreSQL:** Powerful, open source object-relational database system.
- **Docker:** Containerization for easy development and deployment.
- **Swagger:** API documentation and testing.
- **ESLint & Prettier:** Code linting and formatting.
- **Husky & commitlint:** Git hooks to enforce commit message conventions.
- **Jest:** Delightful JavaScript Testing Framework, with unit tests for Use Cases.
- **Multer:** Middleware for handling `multipart/form-data`.

## Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [commitlint](https://commitlint.js.org/)
- [Jest](https://jestjs.io/)
- [tsup](https://tsup.egoist.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Docker](https://www.docker.com/get-started)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Aleydon/NodeJs-Template.git
    cd NodeJs-Template
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variables:

    ```bash
    DATABASE_URL="postgresql://docker:docker@localhost:5432/postgres?schema=public"
    PORT=3333
    ```

### Running the Application

1.  **Start the database:**

    ```bash
    npm run docker:up
    ```

2.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3333`.

## API Endpoints

The API documentation is available at `http://localhost:3333/docs`.

The available routes are:

- `GET /users`: List all users.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update a user.
- `DELETE /users/:id`: Delete a user.

## Database

This template uses Prisma as the ORM and PostgreSQL as the database. The database schema is defined in `prisma/schema.prisma`.

To create a new migration, run the following command:

```bash
npx prisma migrate dev --name <migration_name>
```

## Architecture

This project follows the principles of Clean Architecture, promoting a clear separation of concerns and testability. The main layers are:

- **Domain Layer:** Contains enterprise-wide business rules and entities (e.g., `User` entity).
- **Application Layer:** Orchestrates the flow of data to and from the Domain Layer. It contains Use Cases (e.g., `CreateUserUseCase`, `UpdateUserUseCase`) that encapsulate application-specific business rules. Input validation using Zod is performed in this layer.
- **Infrastructure Layer:** Handles external concerns such as database persistence (e.g., `PrismaUserRepository`), external APIs, and web frameworks (e.g., Express routes).
- **Presentation Layer:** Deals with how the data is presented to the user (e.g., `UserController` handling HTTP requests and responses).

## Testing

This project uses Jest for testing. Unit tests are primarily focused on the **Application Layer** (Use Cases) to ensure the core business logic is correct and isolated from external concerns. Dependencies are mocked to achieve true unit testing.

To run the tests, use the following commands:

- `npm test`: Run all tests.
- `npm run test:watch`: Run all tests in watch mode.
- `npm run test:coverage`: Run all tests and generate a coverage report.

## Linting and Formatting

This project uses ESLint and Prettier for code linting and formatting. To run the linter and formatter, use the following commands:

- `npm run lint`: Lint all files.
- `npm run format`: Format all files.

## Docker

This project uses Docker for containerization. To manage the Docker containers, use the following commands:

- `npm run docker:up`: Start the Docker containers.
- `npm run docker:down`: Stop the Docker containers.
- `npm run docker:restart`: Restart the Docker containers.
- `npm run docker:ps`: List all running Docker containers.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
