import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'sbdprojekt';
  }




export interface Uzytkownicy{

  Nazwa_uzytkownika?: string;
  Haslo?: string;
  Nazwisko?: string;
  Imie?: string;
  Czy_admin?: string;
  Numer_telefonu?: number;
  Mail?: string;

}
