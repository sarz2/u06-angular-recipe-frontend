import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../recipe';
import { RecipeAPIdata } from '../../recipe';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(public recipe: RecipeService) { }
  inputValue!: string;


  handleSearch = () => {
    this.recipe.getRecipe(this.inputValue).subscribe(data =>
      this.recipes = data.hits.map(result => result.recipe));
    console.log(this.recipes);

  };

  ngOnInit(): void {
    this.recipe.getAll().subscribe((data: RecipeAPIdata) => {
      this.recipes = data.hits.map(data => data.recipe);
      console.log(this.recipes);
      return this.recipes;
    });


  }
}

