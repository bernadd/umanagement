import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsUsersService } from './permissions-users.service';

describe('PermissionsUsersService', () => {
  let service: PermissionsUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsUsersService],
    }).compile();

    service = module.get<PermissionsUsersService>(PermissionsUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
