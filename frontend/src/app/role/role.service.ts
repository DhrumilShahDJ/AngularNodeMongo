import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, RoleLevel, RoleResponse } from '../interfaces/role.interface';
import { environment } from 'src/environments/environment';
const API_BASE = environment.apiBase;

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  createRole(body: Role): Observable<RoleResponse> {
    return this.http.post<RoleResponse>(`${API_BASE}/createRole`, body);
  }

  updateRole(body: Role, id: string): Observable<RoleResponse> {
    return this.http.put<RoleResponse>(`${API_BASE}/updateRole/${id}`, body);
  }

  deleteRole(body: Role, id: string): Observable<RoleResponse> {
    return this.http.put<RoleResponse>(`${API_BASE}/deleteRole/${id}`, body);
  }

  getAllRoles(body: {}): Observable<Role[]> {
    return this.http.post<Role[]>(`${API_BASE}/getAllRoles`, body);
  }

  getAllRoleLevels(): Observable<RoleLevel[]> {
    return this.http.get<RoleLevel[]>(`${API_BASE}/getAllRoleLevels`);
  }
}
