import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    password_confirmation: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    const { username, email, password, password_confirmation } = this.form;
    this.service.signUp(username, email, password, password_confirmation).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },

      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    )
    // this.redirectPage()
  }

  redirectPage(): void {
    this.router.navigateByUrl(`recipe`);
  }

  ngOnInit(): void {

  }

}