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
import { ProductListComponent } from './product-list/product-list.component';
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { AddCollectionComponent } from './add-collection/add-collection.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/unauth', pathMatch: 'full' },
    { path: 'recipes', component:RecipesComponent, children: [
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
    ] }, 
    { path: 'shopping-list', component: ShoppingListComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'unauth', component: UnauthComponent },
    { path: 'recipe-list', component: RecipeListComponent },
    { path: 'product-list', component: ProductListComponent},
    { path: 'afterlogin', component: AfterloginComponent},
    { path: 'add-collection', component: AddCollectionComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
