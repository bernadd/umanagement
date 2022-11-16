import { IPermission } from "./permission.type";

export type UserStatus = "Active" | "Inactive";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  permissions: {
    permissionId: number;
    Permission: IPermission;
  }[];
}
