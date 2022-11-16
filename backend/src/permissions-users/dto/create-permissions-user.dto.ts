import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionsUserDto {
  @ApiProperty({ required: true })
  userId: number;

  @ApiProperty({ required: true })
  permissionId: number;
}
