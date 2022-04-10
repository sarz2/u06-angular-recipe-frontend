import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Hit, Recipe } from '../recipe';
import { RecipeAPIdata } from '../recipe';
import { Inject } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
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

  private laravelApi = 'http://localhost:8000/api/';
  private apiUrl = 'https://api.edamam.com/api/recipes/v2?';
  apiId = `e2b5c6c8`;
  apiKey = `d0c39a267c620223e95b26b1a592d624`;
  constructor(
    private http: HttpClient,
    private token: TokenStorageService
  ) { }

  getRecipe(search: string, allergens: string[], mealType: string[]): Observable<RecipeAPIdata> {
    if (!allergens == null && !mealType == null) {
      return this.http.get<RecipeAPIdata>(
        this.apiUrl +
        "type=public&q=" +
        search +
        "&app_id=" +
        this.apiId +
        "&app_key=" +
        this.apiKey +
        '&health=' +
        allergens.join('&health=') +
        '&mealType=' +
        mealType.join('&mealType=')
      ).pipe(catchError(this.errorHandler));
    }
    else if (!allergens == null && mealType == null) {
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
    else if (!mealType == null && allergens == null) {
      return this.http.get<RecipeAPIdata>(
        this.apiUrl +
        "type=public&q=" +
        search +
        "&app_id=" +
        this.apiId +
        "&app_key=" +
        this.apiKey +
        mealType.join('&mealType=')
      ).pipe(catchError(this.errorHandler));
    }
    else {
      return this.http.get<RecipeAPIdata>(
        this.apiUrl +
        "type=public&q=" +
        search +
        "&app_id=" +
        this.apiId +
        "&app_key=" +
        this.apiKey
      ).pipe(catchError(this.errorHandler));
    }

  }

  getRecipeFromId(id: any): Observable<Hit> {
    return this.http.get<Hit>(
      'https://api.edamam.com/api/recipes/v2/' +
      id +
      '?type=public&app_id=' +
      this.apiId +
      '&app_key=' +
      this.apiKey
    );
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