import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login.interface';
import { UserLogin } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(body: UserLogin): Observable<LoginResponse>{
    return this.http.post<LoginResponse>('http://localhost:8080/api/login', body);
  }
}
