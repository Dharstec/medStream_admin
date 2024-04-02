import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  starCount = new Array(500); // Number of stars
  hidePassword = true;

  constructor(private fb: FormBuilder,
    private spinner:NgxSpinnerService,
    private router: Router, private api: ApiService,private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      // email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      // password: ['', Validators.required]
      email: ['', 
      // Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      [Validators.required,Validators.email]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        // Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/)
      ]]
    })
   
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.spinner.show()
      const payload = {
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value
      }
      localStorage.clear()
      this.api.apiPostCall(payload, 'adminLogin').subscribe(data => {
        if(data.data.accessToken){
          localStorage.setItem('token', data.data.accessToken)
          localStorage.setItem('userEmail', data.data.email)
          localStorage.setItem('userRegion', data.data.region)
          this.router.navigate(['/liveCases/list'])  
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: 'LoggedIn Successfully',
          });
          this.spinner.hide()
        }else{
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: 'Failed to LoggedIn',
          }); 
          this.spinner.hide()
        }
      },error=>{
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: error,
        });
        this.spinner.hide()
      })
    }
  }
  
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  ngOnDestroy() {

  }
}
