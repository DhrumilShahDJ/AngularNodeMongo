import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CommonService } from './common.service';
import { Router } from '@angular/router';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const reqCopy = request.clone({
      setHeaders: { Authorization: `Bearer ${this.commonService.getToken()}` },
    });
    return next.handle(reqCopy).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.body['message'] === 'TokenExpiredError') {
            const userData = this.commonService.DecodeToken(
              this.commonService.getToken()
            );
            this.commonService
              .getRefreshToken(userData)
              .subscribe((refreshToken: string) => {
                localStorage.clear();
                localStorage.setItem('token', refreshToken);
              });
          } else if (event.body['message'] === 'JsonWebTokenError') {
            this.commonService.notificationHandler('Invalid Token');
            this.router.navigate(['/login']);
          } else if (event.body['message'] === 'Unauthorized') {
            this.commonService.notificationHandler('Unauthorized');
            this.router.navigate(['/login']);
          }
        }
      })
    );
  }
}
