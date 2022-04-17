import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(
    private service: AuthService,
    private token: TokenStorageService
  ) { }

  public loggedIn!: boolean;
  public isCollapsed = true;


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  ngOnInit(): void {
    this.loggedIn = this.service.isloggedIn();
  }


}

