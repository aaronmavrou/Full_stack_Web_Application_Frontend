import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import{ HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { UnauthComponent } from './unauth/unauth.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AfterloginComponent } from './afterlogin/afterlogin.component';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { PublicCollectionComponent } from './public-collection/public-collection.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { ReviewComponent } from './review/review.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TakedownComponent } from './takedown/takedown.component';
import { LoggingComponent } from './logging/logging.component';
import { AdminComponent } from './admin/admin.component';
import { DeactivateComponent } from './deactivate/deactivate.component';
import { CommentsComponent } from './comments/comments.component';
import { PrivledgeComponent } from './privledge/privledge.component';
import { AddcommentComponent } from './addcomment/addcomment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeEditComponent,
    SignupComponent,
    SigninComponent,
    UnauthComponent,
    ProductListComponent,
    AfterloginComponent,
    AddCollectionComponent,
    PublicCollectionComponent,
    MyCollectionComponent,
    ReviewComponent,
    PrivacyComponent,
    TakedownComponent,
    LoggingComponent,
    AdminComponent,
    DeactivateComponent,
    CommentsComponent,
    PrivledgeComponent,
    AddcommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [ShoppingListService, RecipeService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
