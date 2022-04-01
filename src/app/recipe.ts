export interface Ingredients {
    [index: number]: string;
}

export interface Recipe {
    id?: number;
    label: string;
    image: string;
    ingredientLines: Ingredients;
    /* recipeId: string;
      date: any; */
}


export interface Hit {
    recipe: Recipe;
    ingredient: Ingredients;
}
export interface RecipeAPIdata {
    hits: Hit[];
}