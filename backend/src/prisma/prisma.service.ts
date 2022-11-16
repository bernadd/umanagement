import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  // we need to ensure that app shut downs gracefully: ref to https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
