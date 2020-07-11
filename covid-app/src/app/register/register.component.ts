import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoviddataService } from '../coviddata.service';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  response;
  constructor(
    private fb: FormBuilder,
    private loginService: CoviddataService,
    private notifyService: NotificationService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fname: this.fb.control('', Validators.required),
      lname: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
    });
  }
  validateRegister() {
    console.log(this.registerForm.valid);
    if (this.registerForm.valid) {
      console.log('validating');
      this.loginService
        .registerService(
          this.registerForm.value.fname,
          this.registerForm.value.lname,
          this.registerForm.value.email,
          this.registerForm.value.password
        )
        .subscribe((data) => {
          this.response = data;
          console.log(this.response);
          this.notifyService.showSuccess('Login Successful!');
          this.router.navigate(['/login']);
        });
    } else {
      // alert('Invalid form submission');
      this.notifyService.showWarning('Invalid Form Submission');
    }
  }
  ngOnInit(): void {}
}
