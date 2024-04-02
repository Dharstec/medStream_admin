import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionListComponent } from './institution-list/institution-list.component';
import { InstitutionComponent } from './institution.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { InstitutionAddComponent } from './institution-add/institution-add.component';
import { AuthGuard } from '../services/core/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
  path: '',
  component: InstitutionComponent,
  children: [
    { path: 'list', component: InstitutionListComponent,canActivate: [AuthGuard],},
    { path: 'add', component: InstitutionAddComponent },
    { path: 'edit/:id', component: InstitutionAddComponent },
    { path: 'view/:id', component: InstitutionAddComponent },
  ]
}
];


@NgModule({
  declarations: [
    InstitutionListComponent,InstitutionComponent, InstitutionAddComponent
  ],
  imports: [NgxSpinnerModule,CommonModule, MaterialModule, ReactiveFormsModule, RouterModule.forChild(routes)],

})
export class InstitutionModule { }
