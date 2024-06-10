import { Role, User } from '../users/entities/user.entity';

export interface IJWTData {
  id: number;
  role: Role;
}

export type AuthenticatedHeaders = { authorization?: string };

export interface IAuthService {
  authenticate(user: User, password: string): Promise<boolean>;
  createSalt(): string;
  hashPassword(password: string, salt: string): Promise<string>;
  getDataForJWT(user: User): IJWTData;
  getJWToken(user: User): Promise<string>;
  getJWTPayload(token: string): Promise<IJWTData>;
}
