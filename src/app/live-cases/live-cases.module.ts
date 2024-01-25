import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveListComponent } from './live-list/live-list.component';
import { LiveCasesComponent } from './live-cases.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AddLiveCasesComponent } from './add-live-cases/add-live-cases.component';
import { AuthGuard } from '../services/core/auth.guard';

const routes: Routes = [
  {
  path: '',
  component: LiveCasesComponent,
  children: [
    { path: 'list', component: LiveListComponent, canActivate: [AuthGuard], },
    { path: 'add', component: AddLiveCasesComponent },
    { path: 'edit/:id', component: AddLiveCasesComponent },
    { path: 'view/:id', component: AddLiveCasesComponent },
  ]
}
];

@NgModule({
  declarations: [
    LiveListComponent, LiveCasesComponent, AddLiveCasesComponent
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class LiveCasesModule { }
