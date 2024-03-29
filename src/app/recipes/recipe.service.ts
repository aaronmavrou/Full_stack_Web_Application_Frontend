import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {
    
    recipesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [
    new Recipe('First Test Recipe', 
    'This is simply a test', 
    'https://get.pxhere.com/photo/dish-meal-food-produce-recipe-fish-breakfast-meat-pork-cuisine-steak-pork-chop-power-dishes-grilling-fried-food-604134.jpg',
    [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
        ]
    ),
    new Recipe('Second Test Recipe',
    'This is simply a test',
    'https://get.pxhere.com/photo/dish-meal-food-produce-recipe-fish-breakfast-meat-pork-cuisine-steak-pork-chop-power-dishes-grilling-fried-food-604134.jpg',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 1)
        ]
        )
    ];
    
    constructor(private slService: ShoppingListService){}
    
    getRecipes(){
        return this.recipes.slice();
    }
    
    getRecipe(index: number){
        return this.recipes[index];
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);//calls a function from shopping-list service
    }
    
    //add the new recipe to the recipe array
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    //update the information of the recipe at the specified index
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    
    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
}