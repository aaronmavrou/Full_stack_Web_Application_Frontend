import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router, 
              private route: ActivatedRoute,
              private authService: AuthService){
  }

  ngOnInit() {
    //Listen to the event to see if recipes changes
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
        (recipes: Recipe[])=>{
          this.recipes = recipes;
        }
      );
      
    this.recipes = this.recipeService.getRecipes();
  }
  
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  goBack(){
    this.router.navigate(['unauth']);
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
}
