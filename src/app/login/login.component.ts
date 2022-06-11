import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl(['', Validators.required, Validators.minLength(5)])
  });

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  login(): void {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    this.authService.login(email, password).subscribe(data => this.handleResponse(data));
  }

  redirectPage(): void {
    this.router.navigateByUrl(`recipe`);
  }

  handleResponse(data: any) {
    this.tokenStorage.saveToken(data.token);
    this.tokenStorage.saveEmail(data.user.email);
    this.redirectPage();

  }

}
