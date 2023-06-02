import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../interfaces/register.interface';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
const API_BASE = environment.apiBase;

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(body: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${API_BASE}/register`, body);
  }
}
