export interface CurrentUser {
  id: number;
  name: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}