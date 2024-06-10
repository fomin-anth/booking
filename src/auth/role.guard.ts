import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticatedHeaders } from './auth.interfaces';
import { Reflector } from '@nestjs/core';
import { Role } from '../users/entities/user.entity';
import { ROLES_DECORATOR_KEY } from '../users/entities/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_DECORATOR_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }

  private extractTokenFromHeaders(
    headers: AuthenticatedHeaders,
  ): string | undefined {
    if (!headers.authorization) {
      throw new UnauthorizedException();
    }
    return headers.authorization;
  }
}
