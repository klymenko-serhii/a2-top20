import { Component, OnInit } from '@angular/core';

import { Movie } from '../movie/movie';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'fl-favorite',
  templateUrl: './favorite.component.html'
})
export class FavoriteComponent implements OnInit {
  public movies: Movie[];

  ngOnInit() {
    this.movieService.getFavoriteMovies()
      .subscribe(movies => {
        this.movies = movies;
      })
  }

  constructor(public movieService: MovieService) {}
}
