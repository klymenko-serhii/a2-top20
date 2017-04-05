import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie/movie.service';

import { Movie } from '../movie/movie';

@Component({
  selector: 'fl-top',
  templateUrl: './top.component.html',
  // styleUrls: ['./app.component.css']
})
export class TopComponent implements OnInit {
  public movies: Movie[];

  ngOnInit() {
    this.getMovies();
  }

  constructor(private movieService: MovieService) {
    this.movies = [];
  }

  getMovies() {
    this.movieService.getMovies()
      .subscribe(
        (movies) => {
          console.log(this);
          this.movies = movies;
        }
      );
  }
}
