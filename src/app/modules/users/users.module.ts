import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowUsersComponent } from './show-users/show-users.component';
import { MatIconModule } from '@angular/material/icon';
import { ShowOneUserComponent } from './show-one-user/show-one-user.component'
import { AppRoutingModule } from '../../app-routing.module';


@NgModule({
  declarations: [
    ShowUsersComponent,
    ShowOneUserComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    AppRoutingModule
  ],
  exports: [
    ShowUsersComponent
  ]
})
export class UsersModule { }
