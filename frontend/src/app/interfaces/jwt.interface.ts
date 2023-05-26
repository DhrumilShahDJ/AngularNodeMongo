export interface JwtDecode {
  email: string;
  exp: number;
  iat: number;
  isLogin: boolean;
  name: string;
  role: number;
}
