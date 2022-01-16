import { HttpService } from './http.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SafePipe } from './safe.pipe';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { MyAccountComponent } from './my-account/my-account.component';

import { UserService } from './services/user.services';
import { RecipeService } from './services/recipe.services';

import { User } from './models/user';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SafePipe,
    MyRecipesComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'recipe', component: RecipeComponent },
      { path: 'my-recipes', component: MyRecipesComponent },
      { path: 'my-account', component: MyAccountComponent }
    ])
  ],
  providers: [HttpClientModule,HttpService,UserService,RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
