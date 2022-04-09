import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
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




  signUp(username: string, email: string, password: string, password_confirmation: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.signupUrl}`,
      { username, email, password, password_confirmation },
      httpOptions);
  }


  login(email: string, password: string): Observable<any> {
    this.http.post(
      `${this.loginUrl}`,
      {
        email,
        password
      }, httpOptions);
    if (email && password) {
      window.sessionStorage.setItem('access_token', 'token')
      return of(new HttpResponse({ status: 200 }));
    }
    else {
      return of(new HttpResponse({ status: 401 }));
    }
  }

  logout() {
    window.sessionStorage.removeItem('access_token');
  }

  isloggedIn(): boolean {
    if (window.sessionStorage.getItem('access_token') !== null) {
      return true;
    }
    return false;
  }

  addToList(data: any) {
    return this.http.post(`${this.addToListUrl}`, data, {
      headers: new HttpHeaders({
        Authorization: "Bearer" + this.token.getToken()
      })
    });

  }

  createList(title: string, user_id: number) {
    return this.http.post(`${this.createListUrl}`, { title, user_id }, {
      headers: new HttpHeaders({
        Authorization: "Bearer" + this.token.getToken()
      })
    });
  }

}
