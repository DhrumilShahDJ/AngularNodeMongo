import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';
import { JwtDecode } from '../interfaces/jwt.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  decodedToken: JwtDecode;
  logoutMsg: string = 'User Logout Successfully';
  title: string = 'My App';

  constructor(private commonService: CommonService, private router: Router) {}

  ngOnInit(): void {
    if ('token' in localStorage) {
      this.decodedToken = this.commonService.DecodeToken(
        localStorage.getItem('token')
      );
      this.isLogin = this.decodedToken.isLogin;
      if(this.isLogin){
        this.title = `Welcome ${this.decodedToken.name} to My App`;
      }
    }
  }

  logout(): void {
    localStorage.clear();
    this.commonService.notificationHandler(this.logoutMsg);
    this.router.navigate(['/login']);
  }
}
