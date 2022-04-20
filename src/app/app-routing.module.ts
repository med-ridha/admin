import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGuardGuard } from './auth/my-guard.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DocumentsComponent } from './modules/documents/documents.component';
import { UsersComponent } from './modules/users/users.component';

const routes: Routes = [{
  path: '',
  canActivate: [MyGuardGuard],
  canActivateChild: [MyGuardGuard],
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'users',
    component: UsersComponent,
  }, {
    path: 'documents',
    component: DocumentsComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
