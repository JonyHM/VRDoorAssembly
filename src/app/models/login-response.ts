import { UserDto } from './user.dto';

export interface LoginResponse {
  accessToken: string
  refreshToken: string;
  user: UserDto
}