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
    try{
      console.log(this.userService.user.nazwa_uzytkownika);
    }
    catch (e){
      console.log("Brak danych użytkownika!");
    }
  }

  goRecipeSite(recipeIndex: number) {
    console.log(recipeIndex);
    this.recipeService.currentRecipe = this.recipeService.simpleRecipes[recipeIndex];
    this.router.navigate(['/recipe']);
  }

}
