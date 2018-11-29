import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { UnauthComponent } from './unauth/unauth.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/unauth', pathMatch: 'full' },
    { path: 'recipes', component:RecipesComponent, children: [
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent, canActivate: [AuthGuard] },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    ] }, 
    { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'unauth', component: UnauthComponent },
    { path: 'recipe-list', component: RecipeListComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
