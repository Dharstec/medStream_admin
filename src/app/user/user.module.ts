import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AuthGuard } from '../services/core/auth.guard';

const routes: Routes = [
  {
  path: '',
  component: UserComponent,
  children: [
    { path: 'list', component: UserListComponent ,canActivate: [AuthGuard],},
  ]
}
];


@NgModule({
  declarations: [
    UserListComponent,UserComponent
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class UserModule { }
