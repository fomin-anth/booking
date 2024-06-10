import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './config/env-config.service';
import { Env } from './constants/constants';

async function bootstrap() {
  const configService = new ConfigService();
  const envConfig = new EnvConfig(configService);
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(envConfig.get(Env.SECRET)));
  await app.listen(3000);
}
bootstrap();
