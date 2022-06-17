import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

export interface AuthResponseData {

}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenStorageService) { }


  private baseUrl = 'https://recipe-app-u06.herokuapp.com/api'




  signUp(username: string, email: string, password: string, password_confirmation: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/register`,
      { username, email, password, password_confirmation },
      httpOptions);
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      {
        email,
        password
      }, httpOptions);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  isloggedIn(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  addToList(data: any) {
    const token = this.token.getToken();
    let headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/addtolist`, { id: data.id, title: data.title, image: data.image, recipe_id: data.recipe_id, ingredients: data.ingredients }, { headers });

  }

  createList(title: string) {
    const token = this.token.getToken();
    let headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const email = this.token.getEmail();
    return this.http.post(`${this.baseUrl}/createlist`, { title, email }, { headers });
  }

  getLists(): Observable<any> {

    const token = this.token.getToken();
    let headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/showlists`, { headers });
  }

  getOneList(id: number): Observable<any> {
    const token = this.token.getToken();
    let headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/showlist/${id}`, { headers });

  }

  deleteList(id: number) {
    const token = this.token.getToken();
    let headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/destroy`, { id: id }, { headers });
  }

  removeRecipeFromList(id: number) {
    const token = this.token.getToken();
    let headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/removerecipe`, { id: id }, { headers });

  }

}
