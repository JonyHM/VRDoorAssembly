import { LoginResponse } from './login-response'

export interface DefaultResponse {
  message: string;
  content: LoginResponse;
  error: string;
}

