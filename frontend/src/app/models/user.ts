import {Roles} from './roles';

export interface User {
  id?: number;
  userName?: string,
  firstName: string;
  lastName: string;
  name?: string;
  password?: string;
  role?: Roles;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: number;
  isActive?: boolean;
}

export interface UserCreate {
  user: User;
}

export interface UserResponse {
  count: number;
  data: User[];
}
