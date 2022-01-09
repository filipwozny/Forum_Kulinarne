import { HttpService } from './http.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sbdprojekt';
  allusers: any;
  //userslist: Array<Uzytkownicy>[] = this.httpService.getUsers().subscribe();
  constructor(private httpService: HttpService){
    this.httpService.getUsers().subscribe(users =>{
      this.allusers = users;
    });

  }


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
