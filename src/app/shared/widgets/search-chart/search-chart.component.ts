import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DocumentsService } from 'src/app/services/documents.service';

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
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
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






  constructor(private documentService: DocumentsService) { }

  token: string = localStorage.getItem('token') ?? "";
  ngOnInit() {
    this.documentService.getAllSearch(this.token).subscribe((result: any) => {
      if (result.code == 0) {
        let aboutie = result.message.filter((x: any) => x.foundResult == true).length;
        let nonAboutie = result.message.filter((x: any) => x.foundResult == false).length;
        console.log(aboutie)
        console.log(nonAboutie)
        this.pieChartData.labels?.push("aboutie")
        this.pieChartData.datasets[0].data.push(aboutie);
        this.pieChartData.labels?.push("non aboutie")
        this.pieChartData.datasets[0].data.push(nonAboutie);
        this.chart?.update();
      }
    })
  }
}
