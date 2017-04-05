import { Injectable } from "@angular/core";
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject  } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Movie } from './movie';

/** hard-code token */
const TOKEN = 'b7ad31de-065f-40c6-b7f8-17baa522128f';

@Injectable()
export class MovieService {
  private topMoviesUrl = 'http://www.myapifilms.com/imdb/top?start=1&end=20&token=b7ad31de-065f-40c6-b7f8-17baa522128f&format=json&data=1&callback=JSONP_CALLBACK';
  private movies: BehaviorSubject<Movie[]>;
  private favoriteMovies: BehaviorSubject<Movie[]>;

  constructor(private jsonp: Jsonp, private http: Http) {
    this.movies = new BehaviorSubject([]);
    this.favoriteMovies = new BehaviorSubject([]);
  }

  /** Ger ids of favorite movies */
  get favoriteIds(): String[] {
    let favorites = JSON.parse(localStorage.getItem('fl-favorite'));
    if (favorites instanceof Array) {
      return favorites;
    }
    return [];
  }

  getMovies(): BehaviorSubject<Movie[]> {
    return this.movies;
  }

  getFavoriteMovies(): BehaviorSubject<Movie[]> {
    return this.favoriteMovies;
  }

  /** Fetch movies */
  fetchMovies(): Observable<Movie[]> {
    /** Real API - equal  mock, just slower*/
    // return this.jsonp.get(this.topMoviesUrl)
    //   .map((res: Response) => {
    //     const body = res.json();
    //     let movies = [];
    //     if (body.data && body.data.movies) {
    //       movies = body.data.movies.map(movie => ({
    //         id: movie.idIMDB,
    //         title: movie.title,
    //         poster: movie.urlPoster,
    //         year: parseInt(movie.year, 10),
    //         rating: movie.rating,
    //         genres: movie.genres,
    //         countries: movie.countries,
    //         directors: movie.directors
    //       }));
    //     }
    //     this.movies.next(movies);
    //     const favoriteIds = this.favoriteIds;
    //     this.favoriteMovies.next(movies.filter(movie => (
    //       favoriteIds.indexOf(movie.id) !== -1
    //     )));
    //     return movies;
    //   });

    /** Mock movies */
    return this.http.get('assets/movie.json')
      .map((res: Response) => {
        const body = res.json();
        let movies = body.movies.map(movie => ({
          id: movie.idIMDB,
          title: movie.title,
          poster: movie.urlPoster,
          year: parseInt(movie.year, 10),
          rating: movie.rating,
          genres: movie.genres,
          countries: movie.countries,
          directors: movie.directors
        }));

        this.movies.next(movies);
        const favoriteIds = this.favoriteIds;
        this.favoriteMovies.next(movies.filter(movie => (
          favoriteIds.indexOf(movie.id) !== -1
        )));
        return movies;
      });
  }

  /** Add movie to favorite and push it to favorite-movies collection */
  addFavorite(movie: Movie): void {
    let favorites = JSON.parse(localStorage.getItem('fl-favorite'));
    console.log(favorites);
    if (favorites instanceof Array) {
      favorites.push(movie.id);
    } else {
      favorites = [movie.id];
    }
    console.log(favorites);
    localStorage.setItem('fl-favorite', JSON.stringify(favorites));
    this.favoriteMovies.next([
      ...this.favoriteMovies.value,
      movie
    ]);
  }

  /** Remove movie from favorite and favorite-movies collection */
  removeFavorite(id: String): void {
    let favorites = JSON.parse(localStorage.getItem('fl-favorite'));
    console.log(favorites);
    if (favorites instanceof Array) {
      favorites = favorites.filter(f => f !== id);
    } else {
      favorites = [];
    }
    console.log(favorites);
    localStorage.setItem('fl-favorite', JSON.stringify(favorites));
    this.favoriteMovies.next(this.favoriteMovies.value.filter((movie: Movie) => (
      movie.id !== id
    )));
  }

  /** Check if movie in favorite */
  isFavorite(id: String): Boolean {
    let favorites = JSON.parse(localStorage.getItem('fl-favorite'));
    return (favorites instanceof Array && favorites.indexOf(id) !== -1);
  }
}