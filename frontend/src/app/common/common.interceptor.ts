import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const reqCopy = request.clone({
      setHeaders: {Authorization: `Bearer ${this.commonService.getToken()}`}
    });
    return next.handle(reqCopy);
  }
}
