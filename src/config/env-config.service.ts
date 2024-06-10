import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '../constants/constants';

export interface IConfig {
  get(key: string): any;
}

@Injectable()
export class EnvConfig implements IConfig {
  constructor(private config: ConfigService) {}
  get<T = string>(key: Env) {
    return this.config.getOrThrow<T>(key);
  }

  getRootPath() {
    return join(__dirname, '..');
  }
}
