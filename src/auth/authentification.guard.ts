import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Cookies } from '../constants/constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromRequest(request);
      const payload = await this.authService.getJWTPayload(token);
      request['user'] = payload;
      return true;
    } catch (ex) {
      throw NotFoundException;
    }
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    if (!request.cookies[Cookies.User]) {
      throw new UnauthorizedException();
    }
    return request.cookies[Cookies.User];
  }
}
