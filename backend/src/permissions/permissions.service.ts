import { Injectable } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  create(createPermissionDto: CreatePermissionDto) {
    // create a new permission by create permission dto
    return this.prisma.permission.create({
      data: createPermissionDto as Permission,
    });
  }

  async findAll({ take = 10, page = 0 }: { take: number; page: number }) {
    // get permissions count
    const count = await this.prisma.permission.count();

    // find all permissions and return with pagination
    const permissions = await this.prisma.permission.findMany({
      take,
      skip: page * take,
      select: {
        id: true,
        name: true,
      },
    });

    return {
      count,
      pages: Math.round(count / 10),
      current: page,
      permissions,
    };
  }

  remove(id: number) {
    // remove permission by given id (this is hard delete not soft one)
    return this.prisma.permission.delete({
      where: {
        id,
      },
    });
  }
}
