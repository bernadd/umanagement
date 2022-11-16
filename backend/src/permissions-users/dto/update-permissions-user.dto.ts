import { PartialType } from '@nestjs/swagger';
import { CreatePermissionsUserDto } from './create-permissions-user.dto';

export class UpdatePermissionsUserDto extends PartialType(
  CreatePermissionsUserDto,
) {}
