import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from './recipe';
import { RecipeAPIdata } from './recipe';
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
  private apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=salad&app_id=e2b5c6c8&app_key=d0c39a267c620223e95b26b1a592d624';
  apiId = `e2b5c6c8`;
  apiKey = `d0c39a267c620223e95b26b1a592d624`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<RecipeAPIdata> {
    return this.http
      .get<RecipeAPIdata>(this.apiUrl + '')
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