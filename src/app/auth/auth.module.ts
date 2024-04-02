import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
// import { AuthRoutingModule } from '../auth-routing.module';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpComponent } from './otp/otp.component';
import { NgxSpinnerModule } from 'ngx-spinner';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'forgetPassword', component: ForgetPasswordComponent },
      { path: 'resetPassword', component: ResetPasswordComponent },
      { path: 'otp', component:OtpComponent}
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    OtpComponent,
  ],
  imports: [
    NgxSpinnerModule,CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, MaterialModule, FormsModule
  ]
})
export class AuthModule { }
