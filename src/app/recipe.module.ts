import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeRoutingModule } from './recipe/recipe-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';



@NgModule({
  declarations: [
    RecipeComponent,
    RecipeDetailsComponent,
    RecipeListComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipeModule { }
