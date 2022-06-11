import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { LaravelApiData, Lists } from '../recipe';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: any = {
    title: null,
  }


  lists: Lists[] = [];
  constructor(
    private token: TokenStorageService,
    private service: AuthService

  ) { }

  ngOnInit(): void {
    let email = this.token.getEmail()
    this.service.getLists().subscribe((response: LaravelApiData) => {
      response.data.forEach((e: any) => {
        if (e.email == email) this.lists.push(e)
      })
    });
  }

  isloggedIn() {
    return this.service.isloggedIn();
  }

  onSubmit() {
    const { title } = this.form;
    this.service.createList(title).subscribe();

  }

  deleteList(id: number) {
    console.log("deleted: " + id);
    this.service.deleteList(id).subscribe(data => { console.log("Subscr: " + data) });
  }
}
