import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class HeroService {

  url: string = 'http://localhost:8080/api';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(`${this.url}/heroes`)
      .toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.http.get(`${this.url}/heroes/${id}`)
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero) {
    return this.http.put(`${this.url}/heroes/${hero.id}`, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  create(hero: Hero) {
    return this.http.post(`${this.url}/heroes`, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Hero)
      .catch(this.handleError);
  }

  delete(id: any) {
    return this.http.delete(`${this.url}/heroes/${id}`)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  search(id: string): Observable<Hero> {
    return this.http
      .get(`${this.url}/heroes/${id}`)
      .pipe(map(response => response.json().data as Hero));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
