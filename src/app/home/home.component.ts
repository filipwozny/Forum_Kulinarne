import { Component } from '@angular/core';
import { UserService } from '../services/user.services';
import { RecipeService } from '../services/recipe.services';
import { User } from '../models/user';
import { Category } from '../models/category';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  public filter: string = 'Wszystkie';

  constructor (public userService: UserService, public recipeService: RecipeService, private router: Router) {
    //this.recipeService.getcurrentdisplaySimpleRecipes('Wszytkie');
  }

  ngOnInit() {
  }

  goRecipeSite(recipeIndex: number) {
    this.recipeService.currentRecipe = this.recipeService.currentdisplayRecipes[recipeIndex];
    this.recipeService.getCurrentRecipeActions();
    this.recipeService.getCurrentRecipeIngerdients();
    localStorage.setItem('currentRecipe',JSON.stringify(this.recipeService.currentRecipe));
    this.router.navigate(['/recipe']);
  }

  selectFilter(categoryName: string) {
    if (this.filter != categoryName) {
      this.filter = categoryName;
      this.recipeService.getcurrentdisplaySimpleRecipes(this.filter);
    }
    else {
      this.filter = 'Wszystkie';
      this.recipeService.getcurrentdisplaySimpleRecipes(this.filter);
    }

  }

}
