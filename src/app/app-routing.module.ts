import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveCasesComponent } from './live-cases/live-cases.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '', redirectTo: 'liveCases/list', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => (import('./auth/auth.module')).then((m) => m.AuthModule) },
  { path: 'liveCases', loadChildren: () => (import('./live-cases/live-cases.module')).then((m) => m.LiveCasesModule) },
  // { path: 'experts', loadChildren: () => (import('./experts/experts.module')).then((m) => m.ExpertsModule) },
  { path: 'allCases', loadChildren: () => (import('./all-cases/all-cases.module')).then((m) => m.AllCasesModule) },
  { path: 'user', loadChildren: () => (import('./user/user.module')).then((m) => m.UserModule) },
  { path: 'institution', loadChildren: () => (import('./institution/institution.module')).then((m) => m.InstitutionModule) },
  { path: 'operator', loadChildren: () => (import('./operator/operator.module')).then((m) => m.OperatorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
