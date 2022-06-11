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


  private signupUrl = 'http://localhost:8000/api/register'
  private loginUrl = 'http://localhost:8000/api/login'
  private addToListUrl = 'http://localhost:8000/api/addtolist'
  private createListUrl = 'http://localhost:8000/api/createlist'
  private showlistsUrl = 'http://localhost:8000/api/showlists'
  private destroyListURL = 'http://localhost:8000/api/destroy'

  headers = new HttpHeaders({ 'Accept': 'application/json', Authorization: "Bearer " + this.token.getToken() })



  signUp(username: string, email: string, password: string, password_confirmation: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.signupUrl}`,
      { username, email, password, password_confirmation },
      httpOptions);
  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.loginUrl}`,
      {
        email,
        password
      }, httpOptions);
    // if (email && password) {
    //   localStorage.setItem('access_token', 'token');
    //   localStorage.setItem('email', 'email');
    //   return of(new HttpResponse({ status: 200 }));
    // }
    // else {
    //   return of(new HttpResponse({ status: 401 }));
    // }
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
    return this.http.post(`${this.addToListUrl}`, { id: data.id, title: data.title, image: data.image, recipe_id: data.recipe_id, ingredients: data.ingredients }, { headers });

  }

  createList(title: string) {
    const token = this.token.getToken();
    let headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const email = this.token.getEmail();
    return this.http.post(`${this.createListUrl}`, { title, email }, { headers });
  }

  getLists(): Observable<any> {

    return this.http.get(`${this.showlistsUrl}`);
  }

  deleteList(id: number) {
    const token = this.token.getToken();
    let headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.destroyListURL}`, { id: id }, { headers });
  }

}
