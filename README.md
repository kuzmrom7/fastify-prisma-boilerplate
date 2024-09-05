## Тестовые запросы

```sh
curl -X POST -H "Content-Type: application/json" -d '{"phone":"79995349840", "name":"<EMAIL>"}' http://localhost:3000/api/users
curl -X POST -H "Content-Type: application/json" -d '{"phone2":"79995349840", "name":"<EMAIL>"}' http://localhost:3000/api/users
```

## Команды для PrismaORM

```sh
## prisma-studio
npx prisma studio

## prisma migrate up
npx prisma migrate dev --name init
```
