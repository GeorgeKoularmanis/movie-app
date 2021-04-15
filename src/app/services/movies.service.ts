import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const _apiBaseUrl="https://api.themoviedb.org/3/";
const _apiKey="85204a8cc33baf447559fb6d51b18313";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {}

  getMovies(token: string, event?: number): Observable<any> {
    return this.http.get(`${_apiBaseUrl}search/movie?api_key=${_apiKey}&page=${event}&query=${token}`);
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get(`${_apiBaseUrl}movie/${id}?api_key=${_apiKey}`);
  }

  rateMovie(id: string, rate: number, sessionId: string): Observable<any>{
    return this.http.post(`${_apiBaseUrl}movie/${id}/rating?api_key=${_apiKey}&guest_session_id=${sessionId}`, {value: rate});
  }

  guestSession(id: string): Observable<any>{
    return this.http.get(`${_apiBaseUrl}authentication/guest_session/new?api_key=${_apiKey}`);
  }

}
