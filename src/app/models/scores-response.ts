import { LoginResponse } from './login-response'
import { Scores } from './scores';

export interface ScoresResponse {
  message: string;
  content: Scores;
  error: string;
}

