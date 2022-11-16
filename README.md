# User management

Application runs on postrgesql database (can be run in docker localy). API is done in NestJS and web application is created using NextJS (SSR + Client rendering with server state hydration example).

## Installation

You first need to run database, and you can run easiest way to get up and running is to use docker. From top root folder run following:

```sh
docker-compose up -d
```

This will run PostgreSQL database in docker. Then in terminal:

```sh
cd backend
npm install
```

Application use Prisma as ORM so you need to create a migrations/seeds. While in /backend folder run following:

```
npx prisma migrate dev --name "init"
npm run start:dev
```

This should create migrations in database and seed the initial data (100 user records and 2 permissions).

To run web application in another terminal do following:

```sh
cd web
npm install
npm run dev
```

API should be running on localhost:3000 and web application should be running on localhost:3001. If you have used port 3000 and API runs on another port please ensure to update web/.env with new API url endpoint.
