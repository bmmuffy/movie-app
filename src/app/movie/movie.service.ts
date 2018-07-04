import { Injectable } from '@angular/core';

import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { Movie } from "./Movie";

@Injectable()
export class MovieService {

  private apiUrl = 'http://localhost:8080/movies';

  constructor(private http: Http) {
  }

  findById(id: number): Observable<Movie> {
    return this.http.get(this.apiUrl + '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }

  saveMovie(movie: Movie): Observable<Movie> {

    return this.http.post(this.apiUrl, movie)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  deleteMovieById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put(this.apiUrl, movie)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  findAll(): Observable<Movie[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
