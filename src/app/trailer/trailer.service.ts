import { Injectable } from "@angular/core";
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject  } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Trailer } from './trailer';

/** hard-code token */
const TOKEN = 'b7ad31de-065f-40c6-b7f8-17baa522128f';

@Injectable()
export class TrailerService {
  constructor(private jsonp: Jsonp, private http: Http) {}

  /** Fetch trailers */
  getTrailers(title: string): Observable<Trailer[]> {
    // const trailerURL = `http://www.myapifilms.com/trailerAddict/taapi?token=${TOKEN}&count=8&credit=&format=json&film=${title}&callback=JSONP_CALLBACK`
    /** !Fetching trailers unstable, so just use mocked trailers */
    /** Mock trailers */
    return this.http.get("assets/trailer.json")
      .map((res: Response) => {
        const body = res.json();
        return body.trailers;
      });
  }
}