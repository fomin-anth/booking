import { Role } from '../entities/user.entity';

export class CreateUserDto {
  username: string;
  role: Role;
  password: string;
}
