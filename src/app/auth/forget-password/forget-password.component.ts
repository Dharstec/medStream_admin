import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private api: ApiService,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Using built-in email validator
    });
  }

  onSubmit() {
    console.log('test');

    if (this.form.invalid) {
      console.log('invalid');
      return;
    } else {
      console.log('valid');
      const email = this.form.value.email; // Get the email from the form
      const payload = {
        email: email,
        flag: 'Admin' // Add the flag field to the payload
      };
      this.api.apiPostCall( payload , 'sendOTP').subscribe(
        (data) => {
          console.log(data);
          if (data && data.message && data.message.includes('Email id not found')) {
            // If the response indicates that the email ID was not found, show an error message
            this.snackbar.open('Email ID not found.', 'Close', {
              duration: 3000 // 3 seconds
            })
          } else {
            // If the email was successfully posted, navigate to the OTP page
            this.router.navigate(['/auth/otp'], { queryParams: { email: payload.email, flag: payload.flag } });
          }
        },
        (error) => {
          console.error(error);
          this.snackbar.open('Error sending OTP. Please try again later.', 'Close', {
            duration: 3000 // 3 seconds
          });
        }
      );
      console.log('conditions checked');
    }
}


  ngOnDestroy() {
    // You can perform cleanup here if needed
  }
}
