import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env-config.service';

@Module({
  imports: [],
  providers: [EnvConfig, ConfigService],
  exports: [EnvConfig, ConfigService],
})
export class ConfigModule {}
