# fastify-prisma-boilerplate

Simple boilerplate for Fastify, TypeScript, PrismaORM. Without an overhead with IOC and DI.

## Features

- JWT authorization (access/refresh token)
- Swagger UI
- SQLite (you can change to another database)
- Authorization:
  - login with email code validation (auto-login)
  - oauth2: google, vk, yandex (TODO)
- Dockerfile, docker-compose (TODO)

## Run dev server

```sh
npm run dev
```

## Command for PrismaORM

```sh
## prisma-studio
npx prisma studio

## prisma migrate up
npx prisma migrate dev --name init
```
