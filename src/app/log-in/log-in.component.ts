import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.services';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})


export class LoginComponent {
    login: string = '';
    haslo: string = '';

    constructor (private userService: UserService) {

    }

    @Output() zaloguj = new EventEmitter(); 

    Login() {
      console.log('Dane logowania: ' + this.login + ", " + this.haslo);
      
      this.userService.loginUser(this.login, this.haslo);

      console.log(this.userService.user)
    }
}
