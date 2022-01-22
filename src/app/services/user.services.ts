import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import { User } from '../models/user';



@Injectable()
export class UserService {

    public user: User;
    public czy_zalogowany: boolean;

    private userURL = 'http://localhost:64231/api/uzytkownicy';

    constructor(private http: HttpClient) { 
        if (localStorage.getItem('czy_zalogowany') === 'true') {
            this.czy_zalogowany = true;
        }
        else {
            this.czy_zalogowany = false;
        }
        this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }

    loginUser(username: string, password: string) {
        let temp: User;
        this.http.get<Array<User>>(`${this.userURL}?id=${username}&pass=${password}`).subscribe( rest => { 
            temp = rest[0];
            if(temp !== undefined) { this.czy_zalogowany=true; localStorage.setItem('czy_zalogowany','true'); this.setUser(temp); localStorage.setItem('currentUser',JSON.stringify(temp)); }
         });
    }

    setUser(newUser: User) {
        this.user = newUser;
    }

    registerUser(val: any) {
        return this.http.post(this.userURL, val);
    }


    existUser(username: string) {
        return this.http.get<Array<User>>(`${this.userURL}?id=${username}`);
    }

    logout() {
        this.user = new User('Guest', '', '', '', 0);
        localStorage.setItem('czy_zalogowany','false');
        localStorage.setItem('currentUser',JSON.stringify(this.user));
        this.czy_zalogowany = false;
    }

    updateUser(val: any) {
        this.user = val;
        localStorage.setItem('currentUser',JSON.stringify(this.user));
        console.log(this.user)
        this.http.put(this.userURL, this.user).subscribe(rest => {console.log(rest)});
    }

}
