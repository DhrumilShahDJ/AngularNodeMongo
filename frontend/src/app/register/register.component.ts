import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';
import { RegisterResponse } from '../interfaces/register.interface';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message: string;

  constructor(
    private _fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.minLength(2),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  register(): void {
    this.registerService
      .register(this.registerForm.value)
      .subscribe((result: RegisterResponse) => {
        if (result.statusCode === 200) {
          this.commonService.notificationHandler(result.message);
          this.router.navigate(['/login']);
        } else if (result.statusCode === 403) {
          this.commonService.notificationHandler(result.message);
          this.message = result.message;
        }
      });
  }

  getErrorMessage(): string {
    if (this.registerForm.controls['name'].status === 'INVALID') {
      if (this.registerForm.controls['name'].errors['maxLength']) {
        return 'Name is too Long';
      } else if (this.registerForm.controls['name'].errors['required']) {
        return 'Name is Required';
      } else if (this.registerForm.controls['name'].errors['minLength']) {
        return 'Name is too Short';
      }
    } else if (this.registerForm.controls['email'].status === 'INVALID') {
      if (this.registerForm.controls['email'].errors['email']) {
        return 'Invalid Email';
      } else if (this.registerForm.controls['email'].errors['required']) {
        return 'Email is Required';
      }
    } else if (this.registerForm.controls['password'].status === 'INVALID') {
      return 'Password is Required';
    }
    return null;
  }
}
