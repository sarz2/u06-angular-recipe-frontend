import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { IndexComponent } from "../index/index.component";

const routes: Routes = [
    { path: 'recipe', redirectTo: 'recipe/index', pathMatch: 'full' },
    { path: 'recipe/index', component: IndexComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipeRoutingModule { }