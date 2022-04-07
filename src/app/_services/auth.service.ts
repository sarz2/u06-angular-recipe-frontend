import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
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
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  addToList(data: any) {
    return this.http.post(`${this.addToListUrl}`, data, {
      headers: new HttpHeaders({
        Authorization: "Bearer" + '78eb0e62cebc3204596786ba9aafb32bfbe21b7b91e7b8478c2141bd7616eb30'
      })
    });

  }

}
