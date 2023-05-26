import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUser, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllUsers(body: []): Observable<User[]> {
    return this.http.post<User[]>(
      'http://localhost:8080/api/getAllUsers',
      body
    );
  }

  updateUser(body: User, id: string): Observable<UpdateUser> {
    return this.http.put<UpdateUser>(
      `http://localhost:8080/api/updateUser/${id}`,
      body
    );
  }

  deleteUser(body: User, id: string): Observable<UpdateUser> {
    return this.http.put<UpdateUser>(
      `http://localhost:8080/api/deleteUser/${id}`,
      body
    );
  }
}
