// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';
// import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

// @Component({
//   selector: 'app-reset-password',
//   templateUrl: './reset-password.component.html',
//   styleUrls: ['./reset-password.component.scss']
// })
// export class ResetPasswordComponent implements OnInit {
  
//   form: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router, private api: ApiService,private snackbar: MatSnackBar) { }

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       password: ['', [
//         Validators.required,
//         Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+|~=`{}\\[\\]:";\'<>?,.\\/-]).{8,}$')
//       ]],
//       confirmPassword: ['', Validators.required]
//     }, { validator: this.passwordsMatchValidator });
//   }

//   passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
//     const password = control.get('password');
//     const confirmPassword = control.get('confirmPassword');
//     return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordsNotMatch': true } : null;
//   }

//   onSubmit() {
//     if (this.form.invalid) {
//       return;
//     } else {
//       const payload = {
//         email: this.form.controls['email'].value,
//         password: this.form.controls['password'].value
//       }
//       this.api.apiPostCall(payload, 'adminLogin').subscribe(data => {
//         if(data.data.accessToken){
//           localStorage.setItem('token', data.data.accessToken)
//           this.router.navigate(['/liveCases/list'])  
//           this.snackbar.openFromComponent(SnackbarComponent, {
//             data: 'Logged In Successfully',
//           });
//         } else {
//           this.snackbar.openFromComponent(SnackbarComponent, {
//             data: 'Failed to Log In',
//           }); 
//         }
//       }, error => {
//         this.snackbar.openFromComponent(SnackbarComponent, {
//           data: error,
//         });
//       })
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private api: ApiService, 
    private snackbar: MatSnackBar
  ) { }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     const email = params['email'];
  //     const flag = params['flag'];
  //     this.form = this.fb.group({
  //       newPassword: ['', [
  //         Validators.required,
  //         Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+|~=`{}\\[\\]:";\'<>?,.\\/-]).{8,}$')
  //       ]],
  //       confirmPassword: ['', Validators.required]
  //     }, { validator: this.passwordsMatchValidator });
  //     this.form.patchValue({ email: email, flag: flag });
  //   });
  // }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const flag = params['flag'];
      this.form = this.fb.group({
        email: [email, Validators.required], // Add email control
        flag: [flag, Validators.required], // Add flag control
        newPassword: ['', [
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+|~=`{}\\[\\]:";\'<>?,.\\/-]).{8,}$')
        ]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.passwordsMatchValidator });
    });
  }
  

  passwordsMatchValidator(control: FormGroup): { [key: string]: boolean } | null {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordsNotMatch': true } : null;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    } else {
      const payload = {
        email: this.form.controls['email'].value,
        flag: this.form.controls['flag'].value,
        newPassword: this.form.controls['newPassword'].value,
        confirmPassword: this.form.controls['confirmPassword'].value
      }
      this.api.apiPostCall(payload, 'resetPassword').subscribe(data => {
        if(data && data.message && data.message.includes('Password Changed Successfully')) {
          this.router.navigate(['/auth/login']);
          this.snackbar.open('Password reset successfully. Please login with your new password.', 'Close', {
            duration: 3000 // 3 seconds
          });
        } else {
          this.snackbar.open('Failed to reset password. Please try again.', 'Close', {
            duration: 3000 // 3 seconds
          });
        }
      }, error => {
        console.error(error);
        this.snackbar.open('Error resetting password. Please try again later.', 'Close', {
          duration: 3000 // 3 seconds
        });
      });
    }
  }
}


