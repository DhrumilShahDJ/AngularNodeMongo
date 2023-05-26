export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  message: string;
  statusCode: number;
}

export interface SendUpdatedUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  password: string;
}
