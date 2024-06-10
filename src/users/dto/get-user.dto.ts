import { Role } from '../entities/user.entity';

export class GetUserDto {
  id: number;
  username: string;
  role: Role;
}
