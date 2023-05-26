export interface Role {
  name: string;
  level: RoleLevel;
  isActive: boolean;
}

export interface RoleResponse {
  message: string;
  statusCode: number;
}

export interface RoleLevel {
  _id: number;
  priority: number;
  isActive: boolean;
}

export interface RoleRequest {
  _id: string;
  name: string;
  level: RoleLevel;
  isActive: boolean;
}
