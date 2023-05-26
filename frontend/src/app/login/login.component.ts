import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';
import { LoginResponse } from '../interfaces/login.interface';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login(): void {
    this.loginService
      .login(this.loginForm.value)
      .subscribe((result: LoginResponse) => {
        if (result.statusCode === 404) {
          this.commonService.notificationHandler(result.message);
        } else if (result.statusCode === 401) {
          this.commonService.notificationHandler(result.message);
        } else if (result.statusCode === 200) {
          localStorage.setItem('token', result.token);
          this.commonService.notificationHandler(result.message);
          this.router.navigate(['/']);
        }
      });
  }

  getErrorMessage(): string {
    if (this.loginForm.controls['email'].status === 'INVALID') {
      if (this.loginForm.controls['email'].errors['email']) {
        return 'Invalid Email';
      } else if (this.loginForm.controls['email'].errors['required']) {
        return 'Email is Required';
      }
    } else if (this.loginForm.controls['password'].status === 'INVALID') {
      return 'Password is Required';
    }
    return null;
  }
}
