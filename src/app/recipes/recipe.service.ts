import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
    new Recipe('First Test Recipe', 
    'This is simply a test', 
    'https://get.pxhere.com/photo/dish-meal-food-produce-recipe-fish-breakfast-meat-pork-cuisine-steak-pork-chop-power-dishes-grilling-fried-food-604134.jpg',
    [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
        ]),
    new Recipe('Second Test Recipe',
    'This is simply a test',
    'https://get.pxhere.com/photo/dish-meal-food-produce-recipe-fish-breakfast-meat-pork-cuisine-steak-pork-chop-power-dishes-grilling-fried-food-604134.jpg',
    [
       new Ingredient('Buns', 2),
       new Ingredient('Meat', 1)
        ])
    ];
    
    getRecipes(){
        return this.recipes.slice();
    }
}