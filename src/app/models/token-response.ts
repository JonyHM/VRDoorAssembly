import { TokenContent } from './token-content';

export interface TokenResponse {
  message: string;
  content: TokenContent;
  error: string;
}