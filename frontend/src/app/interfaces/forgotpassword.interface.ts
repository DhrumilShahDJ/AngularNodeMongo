export interface ForgotPassword {
  email: string;
  password: string;
}

export interface ForgotPasswordResponse {
  message: string;
  statusCode: number;
}