import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe, Hit, RecipeAPIdata } from '../recipe';

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
    this.service.getRecipeFromId(this.route.snapshot.params['id']).subscribe((data: any) => {
      this.recipe = data.recipe;
      return this.recipe;
    });
  };
}


