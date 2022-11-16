import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    // create a new user using create dto
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll({ take = 10, page = 0 }: { take: number; page: number }) {
    // Get count of records
    const count = await this.prisma.user.count({
      where: { isDeleted: false },
    });

    // Get users list
    const users = await this.prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        status: true,
        updatedAt: true,
        createdAt: true,
        permissions: {
          select: {
            permissionId: true,
            Permission: true,
          },
        },
      },
      take,
      skip: page * take,
    });

    return {
      count,
      pages: Math.round(count / 10),
      current: page,
      users,
    };
  }

  async findOne(id: number) {
    // get single user by id
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id, isDeleted: false },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        status: true,
        updatedAt: true,
        createdAt: true,
        isDeleted: true,
        permissions: {
          select: {
            permissionId: true,
            Permission: true,
          },
        },
      },
    });

    return user;
  }

  // update single user by using update dto
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        updatedAt: new Date(),
        permissions: {},
      },
    });
  }

  // delete user using user id
  // we perform soft deletion (set the isDeleted boolean on user, instead of deleting fully from db)
  remove(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }
}
