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

    public inputComment: string = "";
    public inputRating: number = 5;


    constructor (public userService: UserService, private router: Router, public recipeService: RecipeService, private datePipe: DatePipe) {
        this.recipeService.currentRecipe = JSON.parse(localStorage.getItem('currentRecipe') || '{}');
        this.recipeService.getCurrentRecipeActions();
        this.recipeService.getCurrentRecipeIngerdients();
        this.recipeService.getcurrentReviews();
        //console.log(recipeService.currentReviews);
        //console.log(recipeService.AllReviews);
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

    postReview() {
        this.recipeService.postReview(this.inputComment, this.inputRating);
        this.recipeService.update();
    }

    reportRecipe() {
        this.recipeService.reportForm.reportType = "Przepis";

        this.recipeService.reportForm.id = this.recipeService.currentRecipe.id_przepisu;
        this.recipeService.reportForm.autor = this.recipeService.currentRecipe.autor;
        this.recipeService.reportForm.data = this.recipeService.currentRecipe.data_dodania;
        this.recipeService.reportForm.nazwa = this.recipeService.currentRecipe.nazwa;
        this.router.navigate(['/report']);
    }

    reportReview(id_recenzji: number, autor: string, ocena: number, data_dodania: Date) {
        this.recipeService.reportForm.reportType = "Recenzja";

        this.recipeService.reportForm.id = id_recenzji;
        this.recipeService.reportForm.autor = autor;
        this.recipeService.reportForm.data = data_dodania;
        this.recipeService.reportForm.ocena = ocena;
        this.router.navigate(['/report']);
    }

    hideRecipe() {

        this.router.navigate(['/recip-notified']);
    }

    hideReview(id: number) {

        this.router.navigate(['/recip-notified']);
    }
}
