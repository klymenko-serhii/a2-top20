import { Component, OnInit, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Movie } from './movie';
import { MovieService } from './movie.service';
import { TrailerComponent } from '../trailer/trailer.component';


@Component({
  selector: 'fl-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;

  public isFavorite: Boolean;

  ngOnInit() {
    this.isFavorite = this.movieService.isFavorite(this.movie.id);
  }

  constructor(private movieService: MovieService, private dialog: MdDialog) {

  }

  openTrailer() {
    this.dialog.open(
      TrailerComponent,
      {
        width: '650px',
        data: { movie: this.movie }
      }
    );
  }

  toggleFavorite(event) {
    if (!this.isFavorite) {
      this.movieService.addFavorite(this.movie);
    } else {
      this.movieService.removeFavorite(this.movie.id);
    }
    this.isFavorite = this.movieService.isFavorite(this.movie.id);
    console.log('isFavorite', this.isFavorite);
  }
}
