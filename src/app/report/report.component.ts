import { Component } from '@angular/core';
import { UserService } from '../services/user.services';
import { RecipeService } from '../services/recipe.services';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

    public reportText: string;

    constructor (public userService: UserService, private router: Router, public recipeService: RecipeService, private datePipe: DatePipe) {
        this.reportText = "Opisz zaistniałą sytuację najdokładniej jak potrafisz. Pomoże to w sprawiedliwej ocenie zgłoszenia.";
    }

    getReportType() {
        return this.recipeService.reportForm.reportType;
    }

    getAuthor() {
        return this.recipeService.reportForm.autor;
    }

    getDate() {
        return this.datePipe.transform(this.recipeService.reportForm.data, 'dd-MM-yyyy');
    }

    getName() {
        return this.recipeService.reportForm.nazwa;
    }


    getRating() {
        return this.recipeService.reportForm.ocena;
    }

    submitReport() {
        this.recipeService.reportForm.opis = this.reportText;
        if (this.recipeService.reportForm.reportType == "Recenzja") 
            this.recipeService.postReviewReport();

        else 
            this.recipeService.postRecipeReport();
    }
}
