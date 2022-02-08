import { Injectable, SimpleChange } from '@angular/core';
import { RecipeNotified } from 'app/models/recipe-notified';
import { recipeSimple } from 'app/models/recipe';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.services';
import { Router } from '@angular/router';
import { ReviewNotified } from 'app/models/review-notified';
import { RecipeID } from 'app/models/recipeID';
import { RecipeService } from './recipe.services';


@Injectable()
export class ReportsService {

  private recipeReportsURL = 'http://localhost:64231//api/zgloszone_Przepisy/';
  private tmpstring: string = '';
  private tmpReport: RecipeNotified | undefined;
  public allReport: Array<RecipeNotified> = [];
  public currentRecipre: recipeSimple | undefined;

  private revieweReportsURL = 'http://localhost:64231//api/zgloszone_recenzje/';
  private tmpstringreview: string = '';
  private tmpreviewReport: ReviewNotified | undefined;
  public allrevieReport: Array<ReviewNotified> = [];
  public currentreviewRecipre: recipeSimple | undefined;
  public currentRecipeID: number | undefined;



  constructor(public http: HttpClient, public userService: UserService, public router: Router , public recipeService: RecipeService) {

      this.getReportedRecipes();
      this.getReportedReviews();
  }



  getReportedRecipes() {
    this.http.get<Array<RecipeNotified>>(`${this.recipeReportsURL}`).subscribe( rest => {
      let sorted = rest.sort((a, b) => (a.status_zgloszenia > b.status_zgloszenia) ? 1 : -1);
      this.allReport = sorted;
     });
     console.log(this.allReport);
}

changestatus(id: number, status: string){


    if(status == 'Rozpatrzone'){
      this.tmpstring = 'Nierozpatrzone';
    }
    else{
      this.tmpstring = 'Rozpatrzone';
    }
    this.tmpReport = new RecipeNotified(id , '' , 0, this.tmpstring , new Date);
    this.http.put(this.recipeReportsURL, this.tmpReport).subscribe(rest => {console.log(rest)});
    window.location.reload();
  }


  getReportedReviews() {
    this.http.get<Array<ReviewNotified>>(`${this.revieweReportsURL}`).subscribe( rest => {
      let sorted = rest.sort((a, b) => (a.status_zgloszenia > b.status_zgloszenia) ? 1 : -1);
      this.allrevieReport = sorted;
     });
     console.log(this.allReport);
}

changestatusreview(id: number, status: string){


  if(status == 'Rozpatrzone'){
    this.tmpstringreview = 'Nierozpatrzone';
  }
  else{
    this.tmpstringreview = 'Rozpatrzone';
  }
  console.log(this.tmpreviewReport);
  this.tmpreviewReport = new ReviewNotified(id , '' , this.tmpstringreview , new Date );
  this.http.put(this.revieweReportsURL, this.tmpreviewReport).subscribe(rest => {console.log(rest)});
  window.location.reload();
}

  getcurretnreecipeID(id:number) {
    return this.http.get<Array<RecipeID>>(`${this.revieweReportsURL}?id=${id}`).subscribe( rest => {
      this.currentRecipeID = rest[0].id_przepisu;
      console.log(this.currentRecipeID);
      this.recipeService.currentRecipe = this.recipeService.simpleRecipes[this.recipeService.simpleRecipes.findIndex(x => x.id_przepisu == this.currentRecipeID )];
      this.recipeService.getCurrentRecipeActions();
      this.recipeService.getCurrentRecipeIngerdients();
      localStorage.setItem('currentRecipe',JSON.stringify(this.recipeService.currentRecipe));
      this.router.navigate(['/recipe']);
     });

  }


}
