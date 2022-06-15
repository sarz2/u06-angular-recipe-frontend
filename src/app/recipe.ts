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
    email: string;
    id: number;
}

export interface LaravelApiData {
    data: Lists[];
    recipe: ListRecipe[];
}

export interface ListRecipe {
    list_id: number;
    SELFREF: string;
    image: string;
}

export interface OneList {
    title: string;
}

export interface Package {
    title: string;
    image: string;
    ingredients: string;
    recipe_id: string | undefined;
    id: number;
}