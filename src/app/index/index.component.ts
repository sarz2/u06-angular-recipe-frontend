import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { RecipeAPIdata } from '../recipe';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  recipies: Recipe[] = [];
  constructor(public recipeService: RecipeService) { }
  ngOnInit(): void {
    this.recipeService.getAll().subscribe((data: RecipeAPIdata) => {
      this.recipies = data.hits.map(data => data.recipe);
      console.log(this.recipies);
      return this.recipies;
    });
  }

}

