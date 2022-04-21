import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGuardGuard } from './auth/my-guard.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AddDocumentComponent } from './modules/documents/add-document/add-document.component';
import { DocumentsComponent } from './modules/documents/documents.component';
import { ShowComponent } from './modules/documents/show/show.component';
import { ShowUsersComponent } from './modules/users/show-users/show-users.component';
import { UsersComponent } from './modules/users/users.component';

const routes: Routes = [{
  path: '',
  canActivate: [MyGuardGuard],
  canActivateChild: [MyGuardGuard],
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, { path: 'users', redirectTo: '/users/show' }, {
    path: 'users',
    component: UsersComponent,
    children: [{
      path: 'show',
      component: ShowUsersComponent
    }]
  }, {
    path: 'documents',
    component: DocumentsComponent,
    children: [{ path: '', redirectTo: '/documents/show', pathMatch: 'full' }, {
      path: 'show',
      component: ShowComponent
    }, {
      path: 'add',
      component: AddDocumentComponent
    }]
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
