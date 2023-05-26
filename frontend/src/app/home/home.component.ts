import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';
import { JwtDecode } from '../interfaces/jwt.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  decodeToken: JwtDecode;
  role: number;

  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit(): void {
    if (!('token' in localStorage)) {
      this.router.navigate(['/login']);
    } else if ('token' in localStorage) {
      this.decodeToken = this.commonService.DecodeToken(
        localStorage.getItem('token')
      );
      this.role = this.decodeToken.role;
    }
  }
}
