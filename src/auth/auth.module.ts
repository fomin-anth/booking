import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from './authentification.guard';
import { ConfigModule } from '../config/config.module';
import { EnvConfig } from '../config/env-config.service';
import { RoleGuard } from './role.guard';

@Module({
  imports: [ConfigModule, JwtModule],
  exports: [AuthService, AuthenticationGuard, JwtModule],
  providers: [AuthService, AuthenticationGuard, RoleGuard, EnvConfig],
})
export class AuthModule {}
