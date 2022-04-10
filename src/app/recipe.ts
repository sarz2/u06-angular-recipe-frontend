export interface Ingredients {
    [index: number]: string;
}

export interface Recipe {
    id?: any;
    label: string;
    image: string;
    ingredientLines: Ingredients;
    uri: string;
    /* recipeId: string;
      date: any; */
}


export interface Hit {
    recipe: Recipe;
    ingredient: Ingredients;
}
export interface RecipeAPIdata {
    hits: Hit[];
    recipe: Recipe;
}

export interface Lists {
    title: string;
}
