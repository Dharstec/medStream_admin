import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertsListComponent } from './experts-list/experts-list.component';
import { ExpertsComponent } from './experts.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ExpertsAddComponent } from './experts-add/experts-add.component';
import { AuthGuard } from '../services/core/auth.guard';

const routes: Routes = [
  {
  path: '',
  component: ExpertsComponent,
  children: [
    { path: 'list', component: ExpertsListComponent,canActivate: [AuthGuard], },
    { path: 'add', component: ExpertsAddComponent },
    { path: 'edit/:id', component: ExpertsAddComponent },
    { path: 'view/:id', component: ExpertsAddComponent },
  ]
}
];
@NgModule({
  declarations: [
    ExpertsListComponent,ExpertsComponent, ExpertsAddComponent
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule.forChild(routes)],

})
export class ExpertsModule { }
