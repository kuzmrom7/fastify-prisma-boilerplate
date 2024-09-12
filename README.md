# fastify-prisma-boilerplate
Simple boilerplate for Fastify.js, TypeScript, PrismaORM. Without an overhead with IOC and DI.

## Features
- jwt authorization (with refresh token)
- swagger
- sqlite (you can change to another database)
- login:
  - with email code validation
  - oauth2: google, vk, yandex (todo)
- email sender
- Dockerfile (todo), docker-compose (todo)

## Command for PrismaORM
```sh
## prisma-studio
npx prisma studio

## prisma migrate up
npx prisma migrate dev --name init
```
