import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login.interface';
import { UserLogin } from '../interfaces/login.interface';
import { environment } from 'src/environments/environment';
const API_BASE = environment.apiBase;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(body: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_BASE}/login`, body);
  }
}
