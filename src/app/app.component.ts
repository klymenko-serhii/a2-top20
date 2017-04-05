import { Component, OnInit } from '@angular/core';

import { MovieService } from './movie/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loading: Boolean;

  ngOnInit() {
    this.loading = true;
    this.movieService.fetchMovies()
      .subscribe(() => {
        this.loading = false;
      });
  }
  
  constructor(private movieService: MovieService) {}
}
