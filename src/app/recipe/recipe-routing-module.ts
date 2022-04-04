import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { IndexComponent } from "./index/index.component";
import { RecipeDetailsComponent } from "../recipe-details/recipe-details.component";

const routes: Routes = [
    { path: '', redirectTo: 'recipe', pathMatch: 'full' },
    { path: 'recipe', redirectTo: 'recipe/index', pathMatch: 'full' },
    { path: 'recipe/index', component: IndexComponent },
    { path: 'detail/:id', component: RecipeDetailsComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipeRoutingModule { }