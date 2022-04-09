import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../_services/recipe.service';
import { Recipe, Hit, RecipeAPIdata } from '../recipe';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe!: any;
  public package = {};


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
  };


  saveToList(recipe: Recipe) {
    this.package = {
      title: recipe.label,
      ingredients: recipe.ingredientLines.toString(),
      image: recipe.image,
      SELFREF: recipe.id
    };
    this.authService.addToList(this.package).subscribe(data => { });
  }

}


