import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePermissionsUserDto } from './dto/create-permissions-user.dto';

@Injectable()
export class PermissionsUsersService {
  constructor(private prisma: PrismaService) {}

  create(createPermissionsUserDto: CreatePermissionsUserDto) {
    // create a new permission on user relation using createpermissionuser dto using prisma connect method
    return this.prisma.permissionsOnUsers.create({
      data: {
        assignedBy: '',
        user: {
          connect: {
            id: createPermissionsUserDto.userId,
          },
        },
        Permission: {
          connect: {
            id: createPermissionsUserDto.permissionId,
          },
        },
      },
    });
  }

  findOne(userId: number) {
    // return all permissions on user by user id
    return this.prisma.permissionsOnUsers.findMany({
      where: {
        userId: userId,
      },
    });
  }

  remove(userId: number, permissionId: number) {
    // delete a permission by given permissionId and userId
    return this.prisma.permissionsOnUsers.delete({
      where: {
        userId_permissionId: {
          userId,
          permissionId,
        },
      },
    });
  }
}
