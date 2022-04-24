import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGuardGuard } from './auth/my-guard.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AddDocumentComponent } from './modules/documents/add-document/add-document.component';
import { DocumentsComponent } from './modules/documents/documents.component';
import { ModifyDocumentComponent } from './modules/documents/modify-document/modify-document.component';
import { ShowOneDocumentComponent } from './modules/documents/show-one-document/show-one-document.component';
import { ShowComponent } from './modules/documents/show/show.component';
import { ShowOneUserComponent } from './modules/users/show-one-user/show-one-user.component';
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
  }, {
    path: 'users',
    component: UsersComponent,
    children: [{ path: '', redirectTo: '/users/show', pathMatch: 'full' }, {
      path: 'show',
      component: ShowUsersComponent
    }, {
      path: 'show/:id',
      component: ShowOneUserComponent
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
    }, {
      path: 'show/:id',
      component: ShowOneDocumentComponent
    }, {
      path: 'modify/:id',
      component: ModifyDocumentComponent 
    }]
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
