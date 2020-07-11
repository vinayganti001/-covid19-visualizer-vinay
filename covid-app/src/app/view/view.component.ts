import { Component, OnInit, ViewChild } from '@angular/core';
import { CoviddataService } from '../coviddata.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { NotificationService } from '../notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

import {
  animate,
  state,
  trigger,
  transition,
  style,
} from '@angular/animations';
import { Router } from '@angular/router';

export interface StateData {
  provinceState: string;
  recovered: number;
  confirmed: number;
  deaths: number;
  active: number;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  // line chart -- daily count from last 1 month
  displayedColumns: string[] = [
    'state',
    'confirmed',
    'active',
    'recovered',
    'deaths',
  ];
  dataSource: MatTableDataSource<StateData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  cases;
  stateWise = [];
  stateDaily = [];
  stateDistrictCompleteDetails = [];
  totalActiveCasesIndia: number;

  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'antiquewhite',
      backgroundColor: 'transparent',
    },
    {
      borderColor: 'greenyellow',
      backgroundColor: 'transparent',
    },
    {
      borderColor: 'indianred',
      backgroundColor: 'transparent',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  // doughnut chart
  doughnutChartLabels: Label[];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';

  constructor(
    private dataService: CoviddataService,
    private notifyService: NotificationService,
    private router: Router
  ) {
    this.dataService.getOverViewData().subscribe((data) => {
      this.cases = data;
      this.totalActiveCasesIndia =
        this.cases.confirmed.value -
        this.cases.recovered.value -
        this.cases.deaths.value;
      console.log(data);
      this.notifyService.showSuccess('Over All Cases data updated!!');
    });

    this.dataService.getStateWiseData().subscribe((data) => {
      this.stateWise = data;
      console.log('statewise length inner', this.stateWise.length);
      this.dataSource = new MatTableDataSource(this.stateWise);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('data src', this.dataSource);
    });

    this.dataService.getDistrictWiseData().subscribe((data) => {
      //let districtDataObj = [];
      Object.keys(data).map((key) => {
        data[key]['state'] = key;
        console.log('statewise length', this.stateWise.length);
        this.stateDistrictCompleteDetails.push(data[key]);
      });
      this.stateDistrictCompleteDetails.forEach((data) => {
        let distData = [];
        Object.keys(data['districtData']).map((key) => {
          data['districtData'][key]['district'] = key;
          distData.push(data['districtData'][key]);
        });
        delete data.districtData;
        data['districtDatas'] = distData;
      });

      console.log('complete details', this.stateDistrictCompleteDetails);

      this.notifyService.showSuccess('District data updated!!');
    });

    this.dataService.getDailyData().subscribe((data) => {
      this.stateDaily = data.states_daily;
      this.stateDaily.forEach((day) => {
        let sum = 0;
        Object.keys(day).map((key) => {
          if (key !== 'date' && key !== 'status') {
            sum += parseInt(day[key]);
            delete day[key];
          }
        });
        day['cases'] = sum;
      });
      console.log('final state daily', this.stateDaily);
      let dailyCount = [];
      let confirmedDays = [];
      let confirmedLabels = [];
      let deathDays = [];
      let deathLabels = [];
      let recoveredDays = [];
      let recoveredLabels = [];
      this.stateDaily.filter((day) => {
        Object.keys(day).map((key) => {
          let lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          if (key === 'date') {
            //console.log(lastMonth, typeof day[key], new Date(day[key]));
            if (new Date(day[key]) > lastMonth) {
              dailyCount.push(day);
              if (day['status'] === 'Confirmed') {
                confirmedDays.push(day['cases']);
                confirmedLabels.push(day[key]);
              }
              if (day['status'] === 'Recovered') {
                recoveredDays.push(day['cases']);
                recoveredLabels.push(day[key]);
              }
              if (day['status'] === 'Deceased') {
                deathDays.push(day['cases']);
                deathLabels.push(day[key]);
              }
            }
          }
        });
      });
      this.stateDaily = dailyCount;
      console.log('finally state daily', this.stateDaily);
      console.log('labels', confirmedLabels);
      console.log('days', confirmedDays);

      this.lineChartLabels = confirmedLabels;
      this.lineChartData = [
        {
          data: confirmedDays,
          label: 'Daily Confirmed Cases',
        },
        {
          data: recoveredDays,
          label: 'Daily Recovered Cases',
        },
        {
          data: deathDays,
          label: 'Daily Death Cases',
        },
      ];

      //--- pie chart
      let confirmedSum = confirmedDays.reduce((a, b) => a + b, 0);
      let recoveredSum = recoveredDays.reduce((a, b) => a + b, 0);
      let deathSum = deathDays.reduce((a, b) => a + b, 0);
      let totalSum = confirmedSum + recoveredSum + deathSum;
      let confirmedPercent = (confirmedSum / totalSum) * 100;
      let recoveredPercent = (recoveredSum / totalSum) * 100;
      let deathPercent = (deathSum / totalSum) * 100;
      this.doughnutChartLabels = ['Confirmed', 'Recovered', 'Death'];
      this.doughnutChartData = [
        [confirmedPercent, recoveredPercent, deathPercent],
      ];
    });
    this.notifyService.showSuccess('State Wise data updated!!');
  }
  viewDistricts(stateName) {
    console.log('stateName', stateName);
    this.notifyService.showInfo(
      stateName.provinceState + ' Details need to be updated!!'
    );
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logout() {
    this.router.navigate(['/login']);
    console.log('logged out');
    localStorage.removeItem('token');
    this.notifyService.showSuccess('Logged Out Successfully!');
  }
}
