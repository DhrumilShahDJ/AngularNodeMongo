import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common/common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private commonService: CommonService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.commonService.isLoggedin().isLogin) {
      const userRole = this.commonService.isLoggedin().role;
      debugger;
      if (userRole !== route.data['role']) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
