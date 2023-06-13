import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';
import { ForgotPasswordResponse } from '../interfaces/forgotpassword.interface';
import { ForgotpasswordService } from './forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private forgotPasswordService: ForgotpasswordService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    this.forgotPasswordService
      .forgotPassword(this.forgotPasswordForm.value)
      .subscribe((result: ForgotPasswordResponse) => {
        if (result.statusCode === 200) {
          this.commonService.notificationHandler(result.message);
          this.router.navigate(['/login']);
        } else if (result.statusCode === 404) {
          this.commonService.notificationHandler(result.message);
        }
      });
  }

  getErrorMessage(): string {
    if (this.forgotPasswordForm.controls['email'].status === 'INVALID') {
      if (this.forgotPasswordForm.controls['email'].errors['email']) {
        return 'Invalid Email';
      } else if (this.forgotPasswordForm.controls['email'].errors['required']) {
        return 'Email is Required';
      }
    } else if (
      this.forgotPasswordForm.controls['password'].status === 'INVALID'
    ) {
      return 'Password is Required';
    }
    return null;
  }
}
