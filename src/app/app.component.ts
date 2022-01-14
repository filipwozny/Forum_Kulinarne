import { Component } from '@angular/core';
import { UserService } from './services/user.services';
import { RecipeService } from './services/recipe.services';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'sbdprojekt';

  constructor(private userService: UserService, private recipeService: RecipeService) {
  }

  logout() {
      //this.userService.logout();
  }
}
