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

  allergens = [
    { name: 'peanut-free', checked: false },
    { name: 'dairy-free', checked: false },
    { name: 'gluten-free', checked: false },
    { name: 'egg-free', checked: false },
    { name: 'shellfish-free', checked: false }

  ]

  get selectedAllergens() {
    return this.allergens
      .filter(allergen => allergen.checked)
      .map(allergen => allergen.name);

  }

  handleSearch = () => {
    this.recipe.getRecipe(this.inputValue, this.selectedAllergens).subscribe(data =>
      this.recipes = data.hits.map(result => result.recipe));
    console.log(this.recipes);

  };

  goToRecipe = () => {

  }

  ngOnInit(): void {
    this.recipe.getAll().subscribe((data: RecipeAPIdata) => {
      this.recipes = data.hits.map(data => data.recipe);
      return this.recipes;
    });


  }
}

