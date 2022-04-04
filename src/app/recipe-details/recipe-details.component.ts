import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeAPIdata } from '../recipe';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe!: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: RecipeService
  ) { }

  ngOnInit(): void {
    this.service.getRecipeFromId(this.route.snapshot.params['id']).subscribe((data: RecipeAPIdata) => {
      this.recipe = data.hits.map(data => {
        let recipe = data.recipe;
        recipe.id = recipe.uri.split('#recipe_').pop();
        return recipe;
      })[0];
    });
  }

}
