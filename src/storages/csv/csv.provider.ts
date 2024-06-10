import {
  existsSync,
  writeFileSync,
  mkdirSync,
  promises,
  readFileSync,
} from 'fs';
import { join } from 'path';
import { FindOptionsWhere } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { IStorage } from '../storage.interfaces';
import { ICsvProviderOptions, IRepoMeta } from './csv.interfaces';
import {
  CsvConfigKey,
  CsvEntityKey,
  CsvTypesLength,
  Fillers,
} from './csv.constants';
import { BinarySearch } from '../../core/BinarySearch';
import { FileReader } from '../../core/FileReader';

@Injectable()
export class CsvProvider<T> implements IStorage<T> {
  private readonly repoFile: string;
  private readonly fileReader: FileReader;
  private readonly repoMetaFile: string;
  private entityKeys: string[];
  private repoMeta: IRepoMeta;

  constructor(
    @Inject(CsvConfigKey) private options: ICsvProviderOptions,
    @Inject(CsvEntityKey) private Entity: new (...args: any[]) => T,
  ) {
    this.parseString = this.parseString.bind(this);
    this.repoFile = join(options.repoPath, `${options.repoName}.csv`);
    this.repoMetaFile = join(options.repoPath, `${options.repoMetaName}.csv`);
    this.fileReader = new FileReader(this.repoFile);
    this.initRepo();
  }

  private initRepo() {
    if (!existsSync(this.options.repoPath)) {
      mkdirSync(this.options.repoPath);
    }

    if (!existsSync(this.repoMetaFile)) {
      this.repoMeta = {
        count: 0,
        maxId: -1,
      };
      writeFileSync(this.repoMetaFile, JSON.stringify(this.repoMeta));
    } else {
      this.repoMeta = JSON.parse(readFileSync(this.repoMetaFile).toString());
    }

    if (!existsSync(this.repoFile)) {
      writeFileSync(this.repoFile, '');
    }

    const emptyEntity = new this.Entity();
    this.entityKeys = Object.keys(emptyEntity);
  }

  async find(options?: FindOptionsWhere<T>): Promise<T[]> {
    const fileEntities = (await promises.readFile(this.repoFile))
      .toString()
      .split('\n');
    fileEntities.pop();
    const entities = fileEntities.map(this.parseString);
    return entities.filter((entity) => this.where(entity, options));
  }

  async findOne(options?: FindOptionsWhere<T>): Promise<T | undefined> {
    if (typeof options['id'] !== 'undefined') {
      const id = options['id'];
      const bs = new BinarySearch(0, this.repoMeta.count - 1, (currentNumber) =>
        this.compare(id, currentNumber),
      );
      const lineRes = await bs.find();
      const string = await this.fileReader.readFileLine(
        lineRes.currentPosition,
        this.getLineSize(),
      );
      const entity = this.parseString(string);
      if (this.where(entity, options)) {
        return entity;
      }
      return undefined;
    }

    let line = 0;
    while (line < this.repoMeta.count) {
      const string = await this.fileReader.readFileLine(
        line,
        this.getLineSize(),
      );
      const entity = this.parseString(string);
      if (this.where(entity, options)) {
        return entity;
      }
      line++;
    }
    return undefined;
  }

  async create(item: T): Promise<T> {
    const string = Object.values(item).map(this.encodeValue).join(',');
    const newId = this.repoMeta.maxId + 1;
    await promises.appendFile(
      this.repoFile,
      `${this.encodeValue(newId)},${string}\n`,
    );
    this.repoMeta.maxId = newId;
    this.repoMeta.count = this.repoMeta.count + 1;
    await promises.writeFile(this.repoMetaFile, JSON.stringify(this.repoMeta));
    return {
      id: newId,
      ...item,
    };
  }

  update(id: number, item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  remove(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  private where(entity: T, options: FindOptionsWhere<T>) {
    return Object.keys(options).every((key) => {
      return entity[key] === options[key];
    });
  }

  private parseString(csvString: string): T {
    const batches = csvString.split(',');
    const entity = new this.Entity();
    for (const [index, key] of this.entityKeys.entries()) {
      entity[key] = this.decodeValue(batches[index], typeof entity[key]);
    }
    return entity;
  }

  private encodeValue(value: any) {
    if (typeof value === 'string') {
      return value.padStart(CsvTypesLength.string, Fillers.string);
    }

    if (typeof value === 'number') {
      return value.toString().padStart(CsvTypesLength.number, Fillers.number);
    }

    return value;
  }

  private decodeValue(value: string, type: string) {
    if (type === 'string') {
      return value.replace(/^!*/gi, '');
    }

    if (type === 'number') {
      return parseInt(value);
    }

    return value;
  }

  private getLineSize() {
    const e = new this.Entity();
    let lineSize = 0;
    const defaultValues = Object.values(e);
    for (const value of defaultValues) {
      lineSize += CsvTypesLength[typeof value];
    }
    return lineSize + defaultValues.length; //"," counting too + \n symbol
  }

  private async compare(id: number, currentNumber: number) {
    const eString = await this.fileReader.readFileLine(
      currentNumber,
      this.getLineSize(),
    );
    const entity = this.parseString(eString);
    return entity['id'] === id ? 0 : id > entity['id'] ? 1 : -1;
  }
}
