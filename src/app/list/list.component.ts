import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LaravelApiData, OneList } from '../recipe';
import { convertFromMaybeForwardRefExpression } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  recipes: any = [];

  list = {} as OneList;

  constructor(private token: TokenStorageService,
    private service: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.service.getOneList(this.route.snapshot.params['id']).subscribe((response) => {
      response.forEach((e: any) => {
        this.recipes.push(e)
      })
    })


    this.service.getLists().subscribe((response: LaravelApiData) => {
      response.data.forEach((e: any) => {
        if (e.id == this.route.snapshot.params['id']) {
          this.list = e;
        };
      });
    })


  }

  removeRecipe(id: number) {
    this.service.removeRecipeFromList(id).subscribe(data => this.refresh()
    );
  }

  refresh(): void {
    window.location.reload();
  }
}
