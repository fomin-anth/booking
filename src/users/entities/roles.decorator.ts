import { SetMetadata } from '@nestjs/common';
import { Role } from './user.entity';

export const ROLES_DECORATOR_KEY = 'roles';
export const Roles = (...roles: Role[]) =>
  SetMetadata(ROLES_DECORATOR_KEY, roles);
