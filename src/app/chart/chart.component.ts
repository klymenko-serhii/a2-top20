import { Component, OnInit } from '@angular/core';

import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'fl-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
 
  ngOnInit() {
    this.movieService.getMovies()
      .subscribe(movies => {
        const _pieChartLabels = [];
        const _pieChartData = [];
        movies.map(movie => {
          const decade = (movie.year - (movie.year % 10)).toString();
          const index = _pieChartLabels.indexOf(decade);
          if (index !== -1) {
            _pieChartData[index] += 1;
          } else {
            _pieChartLabels.push(decade);
            _pieChartData.push(1);
          }
        });
        this.pieChartData = _pieChartData;
        this.pieChartLabels = _pieChartLabels;
        console.log(this.pieChartData, this.pieChartLabels)
      });
  }

  constructor(private movieService: MovieService) {}
}
