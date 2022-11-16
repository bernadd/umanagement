import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PermissionsUsersService } from './permissions-users.service';
import { CreatePermissionsUserDto } from './dto/create-permissions-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permissions-users')
@Controller('permissions-users')
export class PermissionsUsersController {
  constructor(
    private readonly permissionsUsersService: PermissionsUsersService,
  ) {}

  @Post()
  create(@Body() createPermissionsUserDto: CreatePermissionsUserDto) {
    return this.permissionsUsersService.create(createPermissionsUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsUsersService.findOne(+id);
  }

  @Delete(':id/permission/:permissionId')
  remove(@Param('id') id: string, @Param('permissionId') permissionId: string) {
    return this.permissionsUsersService.remove(+id, +permissionId);
  }
}
