import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role, RoleCreateRequest, RoleUpdateRequest } from "../models/admin.model";
import { User } from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  /** GET all roles */
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }

  /** CREATE a new role */
  createRole(roleRequest: RoleCreateRequest): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/roles`, roleRequest);
  }

  /** UPDATE user roles */
  updateUserRoles(username: string, roles: string[]): Observable<User> {
    const request: RoleUpdateRequest = { roles };
    return this.http.put<User>(`${this.apiUrl}/users/${username}/roles`, request);
  }

  /** GET users by role */
  getUsersByRole(roleName: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/roles/${roleName}/users`);
  }

}