import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.services';
import { RecipeService } from '../services/recipe.services';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { recipeSimple } from 'app/models/recipe';

@Component({
  selector: 'app-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})


export class MyAccountComponent {

    public hidePassword = true;

    constructor (public userService: UserService, private router: Router, public recipeService: RecipeService) {

    }

    ngOnInit() {
    }

    showPassword() {
        this.hidePassword = !this.hidePassword;
    }

}
