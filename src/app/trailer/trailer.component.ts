import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MdDialogRef } from '@angular/material';

import { Trailer } from './trailer';
import { TrailerService } from './trailer.service';
import { Movie } from '../movie/movie';

@Component({
  selector: 'fl-trailer',
  templateUrl: './trailer.component.html',
  // styleUrls: ['./app.component.css']
})
export class TrailerComponent implements OnInit {
  public movie: Movie;
  public trailers: Trailer[] = [];
  public currentTrailer: number = 0;

  ngOnInit() {
    this.trailerService.getTrailers(this.movie.title)
      .subscribe(trailers => {
        this.trailers = trailers;
      });
  }

  constructor(private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private trailerService: TrailerService,
    private dialogRef: MdDialogRef<TrailerComponent>
  ) {
    this.movie = this.dialogRef.config.data.movie;
  }

  get trailerTitle(): string {
    return this.trailers[this.currentTrailer] ? this.trailers[this.currentTrailer].title : '';
  }

  get trailerURL(): SafeResourceUrl | string {
    const url = this.trailers[this.currentTrailer].embed.match(/<iframe\s+[^>]+src=\"([^"^\\]+)/)[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  nextTrailer() {
    this.currentTrailer += 1;
  }

  prevTrailer() {
    this.currentTrailer -= 1;
  }
}
