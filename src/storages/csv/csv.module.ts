import { DynamicModule, Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CsvProvider } from './csv.provider';
import { CsvConfig } from '../../constants/constants';
import { ICsvProviderOptions } from './csv.interfaces';
import { CsvConfigKey, CsvEntityKey } from './csv.constants';

@Module({})
export class CsvModule {
  public static forEntity<T>(entity: new () => T): DynamicModule {
    let repoName: string;
    const token = getRepositoryToken(entity);

    if (typeof token === 'string') {
      repoName = token;
    } else {
      repoName = token();
    }

    const csvOptions: ICsvProviderOptions = {
      repoPath: CsvConfig.path,
      repoName,
      repoMetaName: repoName + 'Meta',
    };

    return {
      module: CsvModule,
      providers: [
        {
          provide: CsvEntityKey,
          useValue: entity,
        },
        {
          provide: CsvConfigKey,
          useValue: csvOptions,
        },
        CsvProvider,
      ],
      exports: [
        {
          provide: CsvConfigKey,
          useValue: csvOptions,
        },
        CsvProvider,
      ],
    };
  }
}
