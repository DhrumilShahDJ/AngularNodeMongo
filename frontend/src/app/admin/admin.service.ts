import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUser, User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
const API_BASE = environment.apiBase;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllUsers(body: []): Observable<User[]> {
    return this.http.post<User[]>(`${API_BASE}/getAllUsers`, body);
  }

  updateUser(body: User, id: string): Observable<UpdateUser> {
    return this.http.put<UpdateUser>(`${API_BASE}/updateUser/${id}`, body);
  }

  deleteUser(body: User, id: string): Observable<UpdateUser> {
    return this.http.put<UpdateUser>(`${API_BASE}/deleteUser/${id}`, body);
  }
}
