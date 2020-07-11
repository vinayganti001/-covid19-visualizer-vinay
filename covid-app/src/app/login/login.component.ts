import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CoviddataService } from '../coviddata.service';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';

import '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  response;
  constructor(
    private fb: FormBuilder,
    private loginService: CoviddataService,
    private notifyService: NotificationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
    });
  }
  validateLogin() {
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      console.log('validating');
      this.loginService
        .loginService(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe((data) => {
          this.response = data;
          console.log(this.response);
          this.notifyService.showSuccess('Login Successful!');
          localStorage.setItem('token', this.response.token);
          this.router.navigate(['/view']);
        });
    } else {
      //alert('Invalid form submission');

      this.notifyService.showWarning('Invalid Form Submission');
    }
  }
  ngOnInit(): void {}
}
