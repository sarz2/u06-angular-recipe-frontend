export interface Recipe {
    id?: number;
    label: string;
    ingredients: string;
    image: string;
    /* recipeId: string;
      date: any; */
}


export interface Hit {
    recipe: Recipe;
}
export interface RecipeAPIdata {
    hits: Hit[];
}