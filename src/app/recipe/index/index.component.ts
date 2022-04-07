import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../_services/recipe.service';
import { Recipe } from '../../recipe';
import { RecipeAPIdata } from '../../recipe';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  recipes: any;
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
      this.recipes = data.hits.map(result => {
        const recipe = result.recipe;
        recipe.id = recipe.uri.split('#recipe_').pop();
        return recipe;
      }));

  };


  ngOnInit(): void {
    this.recipe.getAll().subscribe((data: RecipeAPIdata) => {
      this.recipes = data.hits.map(result => {
        const recipe = result.recipe;
        recipe.id = recipe.uri.split('#recipe_').pop();
        return recipe;
      });
    });


  }
}

