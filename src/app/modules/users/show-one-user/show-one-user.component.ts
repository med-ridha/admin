import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Collab from 'src/app/models/collab';
import DocumentJ from 'src/app/models/documentJ';
import Modules from 'src/app/models/modules';
import User from 'src/app/models/user';
import { DocumentsService } from 'src/app/services/documents.service';
import { UsersService } from 'src/app/services/users.service';

import DatalabelsPlugin from 'chartjs-plugin-datalabels'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-show-one-user',
  templateUrl: './show-one-user.component.html',
  styleUrls: ['./show-one-user.component.scss']
})
export class ShowOneUserComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  user: User = new User("", "", "", [], "", "", "", "", "", "", "", "", [], "");
  collab: Collab = new Collab("", [], new Date(), "");
  listDocuments: DocumentJ[] = [];
  modules: Modules[];
  listAbonn: any = [];
  count : number = 0;

  listUsersCollab: any = [];
  constructor(private documentService: DocumentsService, private route: ActivatedRoute, private userService: UsersService) { }

  token: string = localStorage.getItem('token') ?? ''

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      datalabels: {
       // formatter: (value, ctx) => {
       //   if (ctx.chart.data.labels) {
       //     return ctx.chart.data.labels[ctx.dataIndex];
       //   }
       // },
      },
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };

  public pieChartType: ChartType = 'pie';

  public pieChartPlugins = [DatalabelsPlugin];

  ngOnInit(): void {
    this.documentService.getAllModules(this.token).subscribe((result: any) => {
      if (result.code == 0) {
        this.modules = result.message;
      } else {
        console.log(result);
      }
    })
    this.route.params.subscribe((params: Params) => {
      let userId = params['id'];
      this.userService.getUser(userId, this.token).subscribe((result: any) => {
        if (result.code == 0) {
          this.user = result.message;
          this.listUsersCollab = []
          this.userService.getUserCollabs(this.user.email, this.token).subscribe((result: any) => {
            if (result.code == 0) {
              this.collab = result.message.collab;
              this.listUsersCollab = result.message.listUsers;
            }
          })
          this.userService.getUserFavorit(this.user.email, this.token).subscribe((result: any) => {
            this.listDocuments = [];
            if (result.code == 0) {
              this.listDocuments = result.message;
            } else {
              console.log(result)
            }
          })
          this.userService.getUserSearchH(this.user.email, this.token).subscribe((result: any) => {
            this.pieChartData.labels = []
            this.pieChartData.datasets[0].data = []
            if (result.code == 0) {
              this.count = result.message.length;
              let aboutie = result.message.filter((x: any) => x.foundResult == true).length;
              let nonAboutie = result.message.filter((x: any) => x.foundResult == false).length;
              this.pieChartData.labels?.push(`aboutie`)
              this.pieChartData.datasets[0].data.push(aboutie);
              this.pieChartData.labels?.push(`non aboutie`)
              this.pieChartData.datasets[0].data.push(nonAboutie);
              this.chart?.update();
            } else {
            }
          })
          this.userService.getUserAbonn(this.user.email, this.token).subscribe((result: any) => {
            this.listAbonn = [];
            if (result.code == 0) {
              let listAbonn = result.message;
              for (let abonn of listAbonn) {
                for (let module of abonn.modules) {
                  this.listAbonn.push({
                    name: module,
                    dateStart: abonn.dateStart.split("T")[0],
                    dateFinish: abonn.dateFinish.split("T")[0]
                  })
                }
              }
            }
          })
        } else {
          alert('something went wrong');
        }
      })
    })
  }
  getMod(id: string): string {
    for (let mod of this.modules) {
      if (mod._id == id) return mod.name
    }
    return "not found"
  }

  getCat(id: string): string {
    for (let mod of this.modules) {
      for (let cat of mod.categories) {
        if (cat._id == id) return cat.name
      }
    }
    return "not found"
  }


}
