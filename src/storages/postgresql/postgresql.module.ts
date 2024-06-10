import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Module } from '@nestjs/common';
import { PostgresqlProvider } from './postgresql.provider';
import { Repository } from 'typeorm';
import { ConfigModule } from '../../config/config.module';
import { EnvConfig } from '../../config/env-config.service';
import { Env } from '../../constants/constants';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [EnvConfig],
      useFactory: (config: EnvConfig) => {
        return {
          type: 'postgres',
          database: config.get(Env.DB),
          host: config.get(Env.HOST),
          username: config.get(Env.USERNAME),
          password: config.get(Env.PASSWORD),
          entities: [join(config.getRootPath(), '**/*.entity.{js,ts}')],
          migrations: [
            join(config.getRootPath(), '**/*.postgresql.migration.{js,ts}'),
          ],
          migrationsRun: true,
          synchronize: false,
          logging: true,
        };
      },
    }),
  ],
})
export class PostgresqlModule {
  public static forEntity<T>(entity: new () => T): DynamicModule {
    return {
      module: PostgresqlModule,
      imports: [TypeOrmModule.forFeature([entity])],
      providers: [
        {
          provide: 'ENTITY_CLASS',
          useValue: entity,
        },
        {
          provide: PostgresqlProvider,
          useFactory: (repository: Repository<T>) => {
            return new PostgresqlProvider(repository);
          },
          inject: [getRepositoryToken(entity)],
        },
      ],
      exports: [PostgresqlProvider],
    };
  }
}

/*const MysqlModule = TypeOrmModule.forRoot({
  type: 'mysql',
  database: 'booking',
  host: 'localhost',
  username: 'booking_api',
  password: 'qwerty',
  entities: [__dirname + '../../!**!/!*.entity{.ts,.js}'],
  synchronize: true,
});*/
