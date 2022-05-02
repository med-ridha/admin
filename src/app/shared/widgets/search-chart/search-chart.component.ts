import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DocumentsService } from 'src/app/services/documents.service';
import { NavigationEnd, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search-chart',
  templateUrl: './search-chart.component.html',
  styleUrls: ['./search-chart.component.scss']
})
export class SearchChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
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


  constructor(private userService: UsersService, private route: Router, private documentService: DocumentsService) { }
  userId: string = "";
  url: NavigationEnd;
  token: string = localStorage.getItem('token') ?? "";
  ngOnInit() {
    if (this.route.url.match('/[a-zA-z]*/[a-zA-z]*/[0-9]*/*')) {
      this.userId = this.route.url.split('/')[3];
    } else {
      this.userId = "";
    }
    this.route.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.url = val;
        if (this.route.url.match('/[a-zA-z]*/[a-zA-z]*/[0-9]*/*')) {
          this.userId = this.route.url.split('/')[3];
        } else {
          this.userId = "";
        }
        if (this.url.urlAfterRedirects === '/') {
          this.userId = "";
          this.getData();
        } else {
        }
      }
    });
    this.getData();
  }

  getData() {
    this.pieChartData.labels = []
    this.pieChartData.datasets[0].data = []
    if (this.userId.length > 0) {
      this.userService.getUserSearchH(this.userId, this.token).subscribe((result: any) => {
        this.documentService.getAllSearch(this.token).subscribe((resultAll: any) => {
          if (resultAll.code == 0) {
            let count = resultAll.message.length;
            if (result.code == 0) {
              let countUser = result.message.length;
              count -= countUser;
              this.pieChartData.labels?.push("Utilisateur")
              this.pieChartData.datasets[0].data.push(countUser);
              this.pieChartData.labels?.push("le reste")
              this.pieChartData.datasets[0].data.push(count);
              this.chart?.update();
            }
          }
        })
      })
    } else {
      this.documentService.getAllSearch(this.token).subscribe((result: any) => {
        if (result.code == 0) {
          let aboutie = result.message.filter((x: any) => x.foundResult == true).length;
          let nonAboutie = result.message.filter((x: any) => x.foundResult == false).length;
          this.pieChartData.labels?.push("aboutie")
          this.pieChartData.datasets[0].data.push(aboutie);
          this.pieChartData.labels?.push("non aboutie")
          this.pieChartData.datasets[0].data.push(nonAboutie);
          this.chart?.update();
        }
      })
    }
  }
}
