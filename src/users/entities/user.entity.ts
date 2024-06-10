import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Repository } from '../../constants/constants';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity(Repository.USER)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ enum: Role, default: Role.USER })
  role: Role;

  @Column({ name: 'password_hash', unique: true })
  passwordHash: string;

  @Column({ unique: true })
  salt: string;
}
