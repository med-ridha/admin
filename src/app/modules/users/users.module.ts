import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowUsersComponent } from './show-users/show-users.component';
import { MatIconModule } from '@angular/material/icon';
import { ShowOneUserComponent } from './show-one-user/show-one-user.component'
import { AppRoutingModule } from '../../app-routing.module';
import { SearchChartComponent } from 'src/app/shared/widgets/search-chart/search-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    ShowUsersComponent,
    ShowOneUserComponent,
  //  SearchChartComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    AppRoutingModule,
    SharedModule,
    NgChartsModule
  ],
  exports: [
    ShowUsersComponent,
  ]
})
export class UsersModule { }
