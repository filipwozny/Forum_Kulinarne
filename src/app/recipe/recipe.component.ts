import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.services';
import { RecipeService } from '../services/recipe.services';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-przepis',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})


export class RecipeComponent {


    constructor (public userService: UserService, private router: Router, public recipeService: RecipeService) {
        this.recipeService.currentRecipe = JSON.parse(localStorage.getItem('currentRecipe') || '{}');
    }

    ngOnInit() {
        
    }

    getRecipeName() {
        return (this.recipeService.currentRecipe.nazwa)
    }

    getRecipeAuthor() {
        return (this.recipeService.currentRecipe.autor)
    }

    getRecipeRating() {
        return (this.recipeService.currentRecipe.srednia_recenzji)
    }
}