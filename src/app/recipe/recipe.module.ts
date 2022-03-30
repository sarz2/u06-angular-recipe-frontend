import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { RecipeRoutingModule } from './recipe-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RecipeComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipeModule { }
