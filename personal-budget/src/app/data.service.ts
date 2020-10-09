import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public dataSource = {
    datasets:[
        {
            data: [90,350,80,350],
            backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              '#2E4053',
              '#2ECC71',
              '#B7950B',
            ],
        }
    ],
    labels: ['Eat out','Rent','Groceries','Shopping']
  };

  public d3piechartdata = [{title: "Eat out", budget: 90},
  {title: "Rent", budget: 350},
  {title: "Groceries", budget: 80},
  {title: "Shopping", budget: 350},
  ];
  constructor() { }
}
