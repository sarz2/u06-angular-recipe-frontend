import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from './recipe';
import { RecipeAPIdata } from './recipe';
import { Inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Accept: 'application/json',
    }),
  };

  private apiUrl = 'https://api.edamam.com/api/recipes/v2?';
  apiId = `e2b5c6c8`;
  apiKey = `d0c39a267c620223e95b26b1a592d624`;
  constructor(private http: HttpClient) { }

  getRecipe(search: string, allergens: string[]): Observable<RecipeAPIdata> {
    return this.http.get<RecipeAPIdata>(
      this.apiUrl +
      "type=public&q=" +
      search +
      "&app_id=" +
      this.apiId +
      "&app_key=" +
      this.apiKey +
      '&health=' +
      allergens.join('&health=')
    ).pipe(catchError(this.errorHandler));

  }

  getAll(): Observable<RecipeAPIdata> {
    return this.http
      .get<RecipeAPIdata>(this.apiUrl +
        "type=public&q=salad" +
        "&app_id=" +
        this.apiId +
        "&app_key=" +
        this.apiKey)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}