import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from 'src/app/modules/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav'

import { MatIconModule } from '@angular/material/icon'
import { DocumentsComponent } from 'src/app/modules/documents/documents.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    UsersComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatIconModule,
    FormsModule
  ]
})
export class DefaultModule { }
