import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

    private userSubject?: BehaviorSubject<User>;
    public user?: Observable<User>;
    public czy_zalogowany: boolean = false;

    private userURL = 'http://localhost:64231/api/uzytkownicy';

    constructor(private http: HttpClient) { 
    }

    login(username: string, password: string) {
        return this.http.get<Array<User>>(`${this.userURL}?id=${username}&pass=${password}`)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }));
    }


    loginUser(username: string, password: string): Observable<Array<User>>{
        this.http.get<Array<User>>(`${this.userURL}?id=${username}&pass=${password}`).subscribe( rest => { 
            let user = rest[0];
         });
        return this.http.get<Array<User>>(`${this.userURL}?id=${username}&pass=${password}`);
    }

}
