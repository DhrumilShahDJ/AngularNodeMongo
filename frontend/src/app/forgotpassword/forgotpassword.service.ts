import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotPassword, ForgotPasswordResponse } from '../interfaces/forgotpassword.interface';
import { environment } from 'src/environments/environment';
const API_BASE = environment.apiBase;

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: HttpClient) { }

  forgotPassword(body: ForgotPassword): Observable<ForgotPasswordResponse>{
    return this.http.put<ForgotPasswordResponse>(`${API_BASE}/forgot-password`, body)
  }
}
