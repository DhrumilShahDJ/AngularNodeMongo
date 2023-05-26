import { Injectable, NgModule } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';
import { JwtDecode } from '../interfaces/jwt.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageSize: number = 10;
  pageSizeOptions: Array<number> = [10, 50, 100];

  constructor(private _snackBar: MatSnackBar) {}

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
}
