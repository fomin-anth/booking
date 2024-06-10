import { randomBytes, scrypt } from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { EnvConfig } from '../config/env-config.service';
import { Env } from '../constants/constants';
import { IAuthService, IJWTData } from './auth.interfaces';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private config: EnvConfig,
    private jwtService: JwtService,
  ) {}

  async authenticate(user: User, password: string) {
    const hash = await this.hashPassword(password, user.salt);
    if (hash !== user.passwordHash) {
      throw UnauthorizedException;
    }
    return true;
  }

  createSalt(): string {
    return randomBytes(16).toString('hex');
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    const secret = this.config.get(Env.SECRET);

    return new Promise((resolve: (p: string) => void, reject) => {
      scrypt(`${password}:${secret}`, salt, 32, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
  }

  getDataForJWT(user: User): IJWTData {
    return {
      id: user.id,
      role: user.role,
    };
  }

  async getJWToken(user: User): Promise<string> {
    const secret = this.config.get(Env.SECRET);
    const jwtData: IJWTData = this.getDataForJWT(user);
    return this.jwtService.signAsync(jwtData, { secret });
  }

  async getJWTPayload(token: string): Promise<IJWTData> {
    return this.jwtService.verifyAsync(token, {
      secret: this.config.get(Env.SECRET),
    });
  }
}
