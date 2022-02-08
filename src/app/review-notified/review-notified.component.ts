import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'app/services/recipe.services';
import { ReportsService } from 'app/services/reports.service';
import { UserService } from 'app/services/user.services';

@Component({
  selector: 'app-review-notified',
  templateUrl: './review-notified.component.html',
  styleUrls: ['./review-notified.component.css']
})
export class ReviewNotifiedComponent implements OnInit {

  constructor(public userService: UserService, public router: Router, public reportsService: ReportsService, public recipeService: RecipeService) {
    this.recipeService.currentRecipe = JSON.parse(localStorage.getItem('currentRecipe') || '{}');
    this.recipeService.getCurrentRecipeActions();
    this.recipeService.getCurrentRecipeIngerdients();
    this.recipeService.getcurrentReviews();
   }

  ngOnInit(): void {
  }

  ZmienStatus(id: number , status: string){
    console.log(this.reportsService.allrevieReport);
    this.reportsService.changestatusreview(id,status);

  }

  getrecipeID(id:number){

    this.reportsService.getcurretnreecipeID(id);
  }



}
