import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LiveListComponent } from './live-list/live-list.component';
import { LiveCasesComponent } from './live-cases.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AddLiveCasesComponent } from './add-live-cases/add-live-cases.component';
import { AuthGuard } from '../services/core/auth.guard';
import { OwlDateTimeModule,OwlNativeDateTimeModule,DateTimeAdapter,OWL_DATE_TIME_FORMATS,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

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
  imports: [CommonModule, MaterialModule, ReactiveFormsModule,FormsModule, RouterModule.forChild(routes),
    OwlDateTimeModule,OwlNativeDateTimeModule],
    providers:[DatePipe],
    schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class LiveCasesModule { }
