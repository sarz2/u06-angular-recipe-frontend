import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private service: AuthService
  ) { }

  ngOnInit(): void {
  }

  isloggedIn() {
    return this.service.isloggedIn();
  }


  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
  }
}
