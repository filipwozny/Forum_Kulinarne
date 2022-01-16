import { Component } from '@angular/core';
import { UserService } from '../services/user.services';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public nazwa_uzytkownika: string = '';
  public haslo: string = '';
  public powtorzHaslo: string = '';
  public imie: string = '';
  public nazwisko: string = '';
  public czy_admin: number = 0;
  public telefon?: number;
  public mail?: string;

  public registrationResult: boolean = false;
  public registrationStatus: number = 0;
  // 0 - init value
  // 1 - registration completed
  // 404 - username is taken


  constructor (public userService: UserService, private router: Router) {
  }
  
  Register() {
    var newUser = {
      nazwa_uzytkownika:this.nazwa_uzytkownika,
      haslo:this.haslo,
      imie:this.imie,
      nazwisko:this.nazwisko,
      czy_admin:this.czy_admin,
      numer_telefonu:this.telefon,
      mail:this.mail
    }
    console.log(newUser);

    if(this.checkPasswords() && this.checkName() && this.checkPhone() && this.checkMail()) {
      this.userService.registerUser(newUser).subscribe(rest => {
        if(rest == "Dodano użytkownika") {
          this.registrationResult = true;
          this.registrationStatus = 1;
        }
        else {
          this.registrationStatus = 404;
        }
      });
    }
  }

  checkPasswords(): boolean {
    if (this.haslo === this.powtorzHaslo) {
      return true;
    }
    return false;
  }

  checkName(): boolean {
    if (this.imie != '' && this.nazwisko != '') {
      return true;
    }
    return false;
  }

  checkPhone(): boolean {
    if (!this.telefon || (this.telefon.toString().length == 9)) {
      return true;
    }
    return false;
  }

  checkMail(): boolean {
    if (!this.mail || (this.mail.indexOf('@', 1) && this.mail.includes(".") && this.mail.length > 5 && this.mail[this.mail.length-1].match(/[a-z]/i) && this.mail[0].match(/[a-zA-Z0-9]/i))) {
      return true;
    }
    return false;
  }

  goLoginSite() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

}
