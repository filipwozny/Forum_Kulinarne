import { Component } from '@angular/core';
import { UserService } from '../services/user.services';
import { RecipeService } from '../services/recipe.services';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {

  constructor (public userService: UserService, public recipeService: RecipeService) {
  }

  ngOnInit() {
    try{
      console.log(this.userService.user.nazwa_uzytkownika);
    }
    catch (e){
      console.log("Brak danych użytkownika!");
    }
  }

}
