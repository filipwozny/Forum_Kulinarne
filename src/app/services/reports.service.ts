import { Injectable, SimpleChange } from '@angular/core';
import { RecipeNotified } from 'app/models/recipe-notified';
import { recipeSimple } from 'app/models/recipe';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.services';
import { Router } from '@angular/router';



@Injectable()
export class ReportsService {

  private recipeReportsURL = 'http://localhost:64231//api/zgloszone_Przepisy/';
  private tmpstring: string = '';
  private tmpReport: RecipeNotified | undefined;

  public allReport: Array<RecipeNotified> = [];
  public currentRecipre: recipeSimple | undefined;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {

      this.getReportedRecipes();

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


}
