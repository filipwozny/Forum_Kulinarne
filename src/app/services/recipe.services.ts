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
    public currentRecipe: recipeSimple;

    constructor(private http: HttpClient, private userService: UserService) { 
        this.getSimpleRecipes();
        this.currentRecipe = this.simpleRecipes[0];
    }

    getSimpleRecipes() {
        this.http.get<Array<recipeSimple>>(`${this.userURL}`).subscribe( rest => { 
            for(let i = 0; i < rest.length; i++) {
                let temp = new recipeSimple(rest[i].id_przepisu, rest[i].srednia_recenzji, rest[i].nazwa, rest[i].autor, rest[i].widocznosc, rest[i].photoName)
                this.simpleRecipes.push(temp);
            }
         });
    }

    getUserRecipes() {
        return this.simpleRecipes.filter(x => x.autor === this.userService.user.nazwa_uzytkownika);
    }

}
