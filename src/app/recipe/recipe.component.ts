import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.services';
import { RecipeService } from '../services/recipe.services';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-przepis',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})


export class RecipeComponent {


    constructor (public userService: UserService, private router: Router, public recipeService: RecipeService, private datePipe: DatePipe) {
        this.recipeService.currentRecipe = JSON.parse(localStorage.getItem('currentRecipe') || '{}');
        this.recipeService.getCurrentRecipeActions();
        this.recipeService.getCurrentRecipeIngerdients();
    }

    ngOnInit() {
        console.log(this.recipeService.currentRecipe.id_przepisu)
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

    getRecipeDescription() {
        return (this.recipeService.currentRecipe.opis)
    }

    transformDate(date: any) {
        return this.datePipe.transform(date, 'dd-MM-yyyy');
    }

    getRecipeDate() {
        return this.transformDate(this.recipeService.currentRecipe.data_dodania)
    }

    getRecipeActions() {
        return this.recipeService.currentRecipeActions;
    }

}
