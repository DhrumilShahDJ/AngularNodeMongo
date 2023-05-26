export interface User extends Document {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  role: string;
}
