import { Component } from '@angular/core';
import { UserService } from '../services/user.services';
import { RecipeService } from '../services/recipe.services';
import { Router } from '@angular/router';
import { User } from 'app/models/user';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

    constructor (public userService: UserService, private router: Router, public recipeService: RecipeService) {
    }


}
