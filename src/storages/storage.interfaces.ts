import { FindOptionsWhere, ObjectLiteral } from 'typeorm';

export interface IStorage<T extends ObjectLiteral> {
  find(options?: FindOptionsWhere<T>): Promise<T[] | undefined>;
  findOne(options?: FindOptionsWhere<T>): Promise<T | undefined>;
  create(item: Omit<T, 'id'>): Promise<T | undefined>;
  update(id: number, item: Partial<T>): Promise<T | undefined>;
  remove(id: number): Promise<boolean>;
}

export interface IEntity {
  id: number;
}
