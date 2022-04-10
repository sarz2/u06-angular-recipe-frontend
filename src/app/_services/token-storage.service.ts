import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', (token));
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
  public saveEmail(email: string): void {
    localStorage.setItem('email', (email))
  }

  getEmail() {
    return localStorage.getItem('email');
  }

}
