import { Component } from '@angular/core';
import { UserService } from '../services/user.services';
import { RecipeService } from '../services/recipe.services';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor (public userService: UserService, public recipeService: RecipeService, private router: Router) {
  }

  ngOnInit() {
  }

  goRecipeSite(recipeIndex: number) {
    this.recipeService.currentRecipe = this.recipeService.simpleRecipes[recipeIndex];
    localStorage.setItem('currentRecipe',JSON.stringify(this.recipeService.currentRecipe));
    this.router.navigate(['/recipe']);
  }

}
