import { Roles } from './roles';

export interface FilterParamsModel {
  team?: string;
  isActive?: number;
  limit?: number;
  offset?: number;
  role?: Roles;
  name?: string;
}
