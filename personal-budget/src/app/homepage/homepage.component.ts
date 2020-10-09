import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  constructor(private http: HttpClient, public dataService: DataService) {}


  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      if(this.dataService.dataSource.datasets.length == 0){
      for(var i=0; i < res.myBudget.length; i++){
        this.dataService.dataSource.datasets[0].data[i]=res.myBudget[i].budget;
        this.dataService.dataSource.labels[i]= res.myBudget[i].title;
      }
    }
        this.createChart();
});

}

createChart() {
  var ctx= document.getElementById("myChart");
  var myPieChart= new Chart(ctx, {
      type:'pie',
      data: this.dataService.dataSource,
  });
}
}

