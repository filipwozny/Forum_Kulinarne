import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';


@Injectable()
export class UserService {

    public user: User;
    public czy_zalogowany: boolean;

    private userURL = 'http://localhost:64231/api/uzytkownicy';

    constructor(private http: HttpClient) { 
        this.user = new User('Guest', '', '', '', 0);
        this.czy_zalogowany = false;
    }

    loginUser(username: string, password: string) {
        let temp: User;
        this.http.get<Array<User>>(`${this.userURL}?id=${username}&pass=${password}`).subscribe( rest => { 
            temp = rest[0];
            if(temp !== undefined) { this.czy_zalogowany=true; this.setUser(temp); }
         });
    }

    setUser(newUser: User) {
        this.user = newUser;
    }

}
