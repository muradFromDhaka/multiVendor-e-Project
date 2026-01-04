

import { Role } from "./admin.model";

export interface User {
  userName: string;
  userFirstName?: string;
  userLastName?: string;
  vendorId?: number; 
  email?: string;
  enabled?: boolean;
  roles?: Role[];
}

export interface LoginResponse {
  jwtToken: string;
  user: {
    userName: string;
    userFirstName?: string;
    userLastName?: string;
    email?: string;
    roles: { roleName: string }[];
  };
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

