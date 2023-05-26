import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../interfaces/register.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(body: User): Observable<RegisterResponse>{
    console.log("222", body);
    return this.http.post<RegisterResponse>('http://localhost:8080/api/register', body)
  }
}
