import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.services';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
    login: string = '';
    haslo: string = '';

    constructor (public userService: UserService, private router: Router) {

    }


    Login() {
      this.userService.loginUser(this.login, this.haslo);
    }

    goHomeSite() {
      this.router.navigate(['/']);
    }
}
