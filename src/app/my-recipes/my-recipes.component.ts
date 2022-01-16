import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.services';
import { RecipeService } from '../services/recipe.services';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { recipeSimple } from 'app/models/recipe';

@Component({
  selector: 'app-przepis',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})


export class MyRecipesComponent {

    constructor (public userService: UserService, private router: Router, public recipeService: RecipeService) {

    }

    ngOnInit() {
    }

}
