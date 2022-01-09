import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Uzytkownicy } from './app.component';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }


  getUsers(): Observable<Array<Uzytkownicy>>{
    return this.http.get<Array<Uzytkownicy>>('http://localhost:64231/api/Uzytkownicy');
  }

}


