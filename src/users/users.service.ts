import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PostgresqlProvider } from '../storages/postgresql/postgresql.provider';
import { IStorage } from '../storages/storage.interfaces';
import { AuthService } from '../auth/auth.service';
import { IAuthService } from '../auth/auth.interfaces';
import { IUsersService } from './users.interfaces';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOptionsWhere } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(PostgresqlProvider) private readonly userRepository: IStorage<User>,
    @Inject(AuthService) private authService: IAuthService,
  ) {}

  findOne(options: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOne(options);
  }

  signIn(credentials: CredentialsDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = this.authService.createSalt();
      const passwordHash = await this.authService.hashPassword(
        createUserDto.password,
        salt,
      );
      const newUser = {
        salt,
        passwordHash,
        role: createUserDto.role,
        username: createUserDto.username,
      };
      return this.userRepository.create(newUser);
    } catch (ex) {
      throw ex;
    }
  }

  findAll() {
    try {
      return this.userRepository.find();
    } catch (ex) {
      throw ex;
    }
  }

  findOneById(id: number): Promise<User> {
    try {
      return this.userRepository.findOne({ id });
    } catch (ex) {
      throw ex;
    }
  }

  update(id: number, user: UpdateUserDto): Promise<User> {
    try {
      return this.userRepository.update(id, user);
    } catch (ex) {
      throw ex;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.userRepository.remove(id);
      return true;
    } catch (ex) {
      throw ex;
    }
  }

  castUserToGetUserDto(user: User) {
    try {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
      };
    } catch (ex) {
      throw ex;
    }
  }
}
