
import { HttpService } from './http.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SafePipe } from './safe.pipe';
import { DatePipe } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ReportComponent } from './report/report.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';

import { UserService } from './services/user.services';
import { RecipeService } from './services/recipe.services';


import { User } from './models/user';
import { RecipeNotifiedComponent } from './recipe-notified/recipe-notified.component';
import { ReportsService } from './services/reports.service';
import { ReviewNotifiedComponent } from './review-notified/review-notified.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SafePipe,
    MyRecipesComponent,
    MyAccountComponent,
    CreateRecipeComponent,
    RecipeComponent,
    ReportComponent,
    RecipeNotifiedComponent,
    ReviewNotifiedComponent

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
      { path: 'my-account', component: MyAccountComponent },
      { path: 'create-recipe', component: CreateRecipeComponent },
      { path: 'report', component: ReportComponent },
      { path: 'recip-notified', component: RecipeNotifiedComponent },
      { path: 'review-notified', component: ReviewNotifiedComponent }
    ])
  ],
  providers: [HttpClientModule,HttpService,UserService,RecipeService,DatePipe,ReportsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
