import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../_services/recipe.service';
import { Recipe, Hit, RecipeAPIdata } from '../recipe';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Lists } from '../recipe';
import { LaravelApiData } from '../recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe!: any;
  public package = {};

  lists: Lists[] = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: RecipeService,
    private authService: AuthService,
    private token: TokenStorageService,

  ) { }

  ngOnInit(): void {
    this.service.getRecipeFromId(this.route.snapshot.params['id']).subscribe((data: any) => {
      this.recipe = data.recipe;
      return this.recipe;
    });
    let email = this.token.getEmail()
    this.authService.getLists().subscribe((response: LaravelApiData) => {
      response.data.forEach((e: any) => {
        if (e.email == email) this.lists.push(e)
      })
    });
  };


  saveToList(recipe: Recipe, id: number) {
    this.package = {
      title: recipe.label,
      image: recipe.image,
      ingredients: recipe.ingredientLines.toString(),
      recipe_id: recipe.uri.split('#recipe_').pop(),
      id: id
    };
    this.authService.addToList(this.package).subscribe(data => { });
    console.log(this.package)
  }

}


