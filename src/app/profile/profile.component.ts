import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: any = {
    title: null,
    userId: null
  }

  constructor(
    private token: TokenStorageService,
    private service: AuthService

  ) { }

  ngOnInit(): void {
  }

  isloggedIn() {
    return this.service.isloggedIn();
  }

  onSubmit() {
    const { title, userId } = this.form;
    this.service.createList(title, userId).subscribe();
  }


}
