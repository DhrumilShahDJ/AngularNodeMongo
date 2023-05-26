export interface LoginResponse {
  message: string;
  token: string;
  statusCode: number;
}

export interface UserLogin {
  email: string;
  password: string;
}
