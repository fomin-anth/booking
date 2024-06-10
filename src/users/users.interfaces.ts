import { FindOptionsWhere } from 'typeorm';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOneById(id: number): Promise<User>;
  findOne(options: FindOptionsWhere<User>): Promise<User>;
  update(id: number, user: UpdateUserDto): Promise<User>;
  remove(id: number): Promise<boolean>;
  castUserToGetUserDto(user: User): GetUserDto;
  signIn(credentials: CredentialsDto): Promise<User>;
}

export interface IUsersController {
  create(createUserDto: CreateUserDto): Promise<GetUserDto>;
  findAll(): Promise<GetUserDto[]>;
  findOneById(id: number): Promise<GetUserDto>;
  update(id: number, user: UpdateUserDto): Promise<GetUserDto>;
  remove(id: number): Promise<boolean>;
  signIn(response: Response, credentials: CredentialsDto): Promise<GetUserDto>;
}
