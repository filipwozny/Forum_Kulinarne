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

    public changeUserData: User;
    

    constructor (public userService: UserService, private router: Router, public recipeService: RecipeService) {
      this.changeUserData = new User(this.userService.user.nazwa_uzytkownika, this.userService.user.haslo, this.userService.user.imie, 
        this.userService.user.nazwisko, this.userService.user.czy_admin, this.userService.user.telefon, this.userService.user.mail);
    }

    ngOnInit() {
      console.log(this.changeUserData)
    }

    showPassword() {
        this.hidePassword = !this.hidePassword;
    }

    saveAccount() {
      console.log(typeof(this.changeUserData))
      console.log(this.changeUserData.imie, this.changeUserData.nazwisko, this.changeUserData.haslo)
      console.log(this.userService.updateUser(this.changeUserData));
    }

}
