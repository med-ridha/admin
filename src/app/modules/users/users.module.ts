import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowUsersComponent } from './show-users/show-users.component';
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [
    ShowUsersComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ShowUsersComponent
  ]
})
export class UsersModule { }
