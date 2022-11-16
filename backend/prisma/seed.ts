// prisma/seed.ts
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  for (let i = 0; i <= 100; i++) {
    const username = faker.internet.userName();
    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username,
        password: faker.internet.password(),
        email: faker.internet.email(),
        status: 'Active',
      },
    });

    console.log(user);
  }

  // create two dummy articles
  const permission1 = await prisma.permission.create({
    data: {
      name: 'Code',
    },
  });
  console.log(permission1);

  const permission2 = await prisma.permission.create({
    data: {
      name: 'Descriptin',
    },
  });
  console.log(permission2);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
