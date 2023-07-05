import { Injectable, NgModule } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';
import { JwtDecode } from '../interfaces/jwt.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const API_BASE = environment.apiBase;

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageSize: number = 10;
  pageSizeOptions: Array<number> = [10, 50, 100];
  isLogin: boolean = false;
  decodedToken: JwtDecode;

  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {}

  DecodeToken(token: string): JwtDecode {
    return jwt_decode(token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  notificationHandler(message: string) {
    this._snackBar.open(message, 'cancel', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  isLoggedin(): JwtDecode {
    if ('token' in localStorage) {
      this.decodedToken = this.DecodeToken(this.getToken());
      if (this.decodedToken.isLogin) {
        return this.decodedToken;
      }
    }
    return null;
  }

  getRefreshToken(body: JwtDecode): Observable<String> {
    return this.http.post<String>(`${API_BASE}/getRefreshToken`, body);
  }
}
