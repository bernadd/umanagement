import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PermissionsUsersService } from './permissions-users.service';
import { PermissionsUsersController } from './permissions-users.controller';

@Module({
  controllers: [PermissionsUsersController],
  providers: [PermissionsUsersService],
  imports: [PrismaModule],
})
export class PermissionsUsersModule {}
