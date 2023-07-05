export interface User extends Document {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: string;
}

export interface ExpiredToken extends Document {
  email: string;
  isLogin: boolean;
  name: string;
  role: number;
}
