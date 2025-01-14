# fastify-prisma-boilerplate

Simple and lightweight boilerplate for building applications with Fastify, TypeScript, PrismaORM, and Postgres. Designed to minimize overhead by avoiding complex IOC and DI frameworks.

---

## Features

### Functional Features

- **JWT Authorization**:
  - Access/refresh token support.
  - Bearer schema for access tokens.
  - Refresh token managed via session.
- **Authorization Options**:
  - Email-based login with code validation (supports auto-login upon validation).
  - OAuth2 integration for Google, VK, Yandex (OAuth2 features marked as TODO).
- **API Documentation**:
  - Interactive Swagger UI for exploring and testing API endpoints.
  - Built-in validation using AJV for Swagger schemas.

### Technical Features

- **Database**:
  - Integration with Postgres via PrismaORM.
- **Development Environment**:
  - Docker Compose setup for easy database provisioning.
  - Ready-to-use PrismaORM commands for migrations and schema management.

---

## Getting Started

### Prerequisites

- Ensure you have Docker and Node.js installed on your system.

### Running the Development Server

1. Create an environment file by copying `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```
2. Start the database container using Docker Compose:
   ```sh
   docker-compose up -d
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

---

## PrismaORM Commands

### Open Prisma Studio

Prisma Studio is a GUI for managing your database:

```sh
npm run prisma:studio
```

### Run Migrations

Apply migrations to the database:

```sh
npx prisma migrate dev --name init
```

---

## Roadmap

- [ ] Complete OAuth2 integration for Google, VK, and Yandex.
- [ ] Add unit and integration tests.
- [ ] Enhance Swagger documentation with detailed schemas and examples.

---

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
