import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3piechart',
  templateUrl: './d3piechart.component.html',
  styleUrls: ['./d3piechart.component.scss']
})
export class D3piechartComponent implements OnInit {
  margin = {top: 20, right: 20, bottom: 30, left: 50};
  width: number;
  height: number;
  radius: number;

  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;
  svg: any;


  constructor(private http: HttpClient, public dataService: DataService) {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      console.log(this.dataService.d3piechartdata);
      if(this.dataService.d3piechartdata.length == 0){
        this.dataService.d3piechartdata = res.myBudget;
      }
      this.initSvg();
      this.d3piechart();
    });
  }
  initSvg() {
    this.color = d3Scale.scaleOrdinal()
        .range([ '#ffcd56',
        '#ff6384',
        '#36a2eb',
        '#fd6b19',
        '#2E4053',
        '#2ECC71',
        '#B7950B',]);
    this.arc = d3Shape.arc()
        .outerRadius(this.radius - 10)
        .innerRadius(0);
    this.labelArc = d3Shape.arc()
        .outerRadius(this.radius - 40)
        .innerRadius(this.radius - 40);

    this.labelPer = d3Shape.arc()
        .outerRadius(this.radius - 80)
        .innerRadius(this.radius - 80);

    this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.budget);

    this.svg = d3.select('#d3piechart')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 ' + Math.min(this.width, this.height) + ' ' + Math.min(this.width, this.height))
        .append('g')
        .attr('transform', 'translate(' + Math.min(this.width, this.height) / 2 + ',' + Math.min(this.width, this.height) / 2 + ')');
  }

  d3piechart() {
    const g = this.svg.selectAll('.arc')
        .data(this.pie(this.dataService.d3piechartdata))
        .enter().append('g')
        .attr('class', 'arc');
    g.append('path').attr('d', this.arc)
        .style('fill', (d: any) => this.color(d.data.title) );
    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelArc.centroid(d) + ')')
        .attr('dy', '.35em')
        .text((d: any) => d.data.title);

    g.append('text').attr('transform', (d: any) => 'translate(' + this.labelPer.centroid(d) + ')')
        .attr('dy', '10 em')
        .text((d: any) => d.data.budget);
  }
}
