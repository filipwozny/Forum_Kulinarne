import { ReportsService } from './../services/reports.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.services';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { recipeSimple } from 'app/models/recipe';
import { RecipeService } from 'app/services/recipe.services';

@Component({
  selector: 'app-recipe-notified',
  templateUrl: './recipe-notified.component.html',
  styleUrls: ['./recipe-notified.component.css']
})
export class RecipeNotifiedComponent implements OnInit {

  public reportedRecipe: recipeSimple | undefined;


  constructor(public userService: UserService, private router: Router, public reportsService: ReportsService, public recipeService: RecipeService) {
    this.recipeService.currentRecipe = JSON.parse(localStorage.getItem('currentRecipe') || '{}');
    this.recipeService.getCurrentRecipeActions();
    this.recipeService.getCurrentRecipeIngerdients();
    this.recipeService.getcurrentReviews();

  }

  ngOnInit(): void {
  }

  ZmienStatus(id: number , status: string){

    this.reportsService.changestatus(id,status);

  }

  goRecipeSite(recipeIndex: number) {
    console.log(recipeIndex);
    this.recipeService.currentRecipe = this.recipeService.simpleRecipes[this.recipeService.simpleRecipes.findIndex(x => x.id_przepisu == recipeIndex )];
    this.recipeService.getCurrentRecipeActions();
    this.recipeService.getCurrentRecipeIngerdients();
    localStorage.setItem('currentRecipe',JSON.stringify(this.recipeService.currentRecipe));
    this.router.navigate(['/recipe']);
    console.log(recipeIndex);
  }


}
