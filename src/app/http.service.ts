import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }


  getUsers(): Observable<Array<User>>{
    return this.http.get<Array<User>>('http://localhost:64231/api/Uzytkownicy');
  }

}


