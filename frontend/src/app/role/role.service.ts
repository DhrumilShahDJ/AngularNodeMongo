import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, RoleLevel, RoleResponse } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  createRole(body: Role): Observable<RoleResponse> {
    return this.http.post<RoleResponse>('http://localhost:8080/api/createRole', body);
  }

  updateRole(body: Role, id: string): Observable<RoleResponse> {
    debugger;
    return this.http.put<RoleResponse>(`http://localhost:8080/api/updateRole/${id}`, body);
  }

  deleteRole(body: Role, id: string): Observable<RoleResponse> {
    return this.http.put<RoleResponse>(`http://localhost:8080/api/deleteRole/${id}`, body);
  }

  getAllRoles(body: {}): Observable<Role[]> {
    return this.http.post<Role[]>(`http://localhost:8080/api/getAllRoles`, body);
  }

  getAllRoleLevels(): Observable<RoleLevel[]>{
    return this.http.get<RoleLevel[]>('http://localhost:8080/api/getAllRoleLevels');
  }
}
