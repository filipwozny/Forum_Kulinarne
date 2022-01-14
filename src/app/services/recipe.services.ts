import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import { recipeSimple } from '../models/recipe';
import { UserService } from './user.services';



@Injectable()
export class RecipeService {
    private userURL = 'http://localhost:64231/api/przepisy';
    public photoURL = 'http://localhost:64231/Photos/';

    public simpleRecipes: Array<recipeSimple> = [];

    constructor(private http: HttpClient, private userService: UserService) { 
        this.getSimpleRecipes();
    }

    getSimpleRecipes() {
        console.log("getRecipes()");
        this.http.get<Array<recipeSimple>>(`${this.userURL}`).subscribe( rest => { 
            for(let i = 0; i < rest.length; i++) {
                let temp = new recipeSimple(rest[i].id_przepisu, rest[i].nazwa, rest[i].widocznosc, rest[i].photoName)
                this.simpleRecipes.push(temp);
            }
         });
    }

}
