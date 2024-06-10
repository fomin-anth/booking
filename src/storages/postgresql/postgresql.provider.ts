import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { IStorage } from '../storage.interfaces';

@Injectable()
export class PostgresqlProvider<T extends ObjectLiteral>
  implements IStorage<T>
{
  constructor(public readonly repository: Repository<T>) {}

  find(): Promise<T[]> {
    return this.repository.find();
  }

  async create(item: T): Promise<T> {
    const result = await this.repository.insert(item);
    return result.raw as T;
  }

  async findOne(options: FindOptionsWhere<T>): Promise<T> {
    const item = await this.repository.findOne({ where: options });
    return item;
  }

  async update(id: number, item: T): Promise<T> {
    const updatedItem = await this.repository.update(id, item);
    return updatedItem.raw;
  }

  async remove(id: number): Promise<boolean> {
    await this.repository.delete(id);
    return true;
  }
}
