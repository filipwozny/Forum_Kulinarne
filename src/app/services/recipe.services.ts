import {  HttpClient } from '@angular/common/http';
import { Injectable, SimpleChange } from '@angular/core';
import { of,Observable } from 'rxjs';
import { recipeSimple } from '../models/recipe';
import { Category } from '../models/category';
import { Unit } from '../models/unit';
import { UserService } from './user.services';
import { Action } from '../models/action';
import { Ingredient } from 'app/models/ingredient';
import { SimpleIngredient } from 'app/models/ingredient-simple';
import { RecipeCategory } from 'app/models/recipe-category';



@Injectable()
export class RecipeService {
    private recipeURL = 'http://localhost:64231/api/przepisy';
    public photoURL = 'http://localhost:64231/Photos/';
    private categoryURL = 'http://localhost:64231/api/kategorie';
    private actionURL = 'http://localhost:64231/api/czynnosci';
    private unitsURL = 'http://localhost:64231/api/jednostki';
    private ingredientURL = 'http://localhost:64231/api/ilosci';
    private ingredientNameURL = 'http://localhost:64231/api/skladniki';
    private recipeCategoryURL = 'http://localhost:64231/api/kategorie_przepisow';

    public categories: Array<Category> = [];

    public simpleRecipes: Array<recipeSimple> = [];
    public currentRecipe: recipeSimple;
    public userRecipes: Array<recipeSimple> = [];
    public units: Array<Unit> = [];
    public ingredientsName: Array<SimpleIngredient> = [];

    constructor(private http: HttpClient, private userService: UserService) { 
        this.getSimpleRecipes();
        this.currentRecipe = this.simpleRecipes[0];
        this.userRecipes = this.getUserRecipes();
        this.getCategories();
        this.getUnits();
        this.getIngredientsName();
    }

    getSimpleRecipes() {
        this.http.get<Array<recipeSimple>>(`${this.recipeURL}`).subscribe( rest => { 
            for(let i = 0; i < rest.length; i++) {
                let temp = new recipeSimple(rest[i].id_przepisu, rest[i].srednia_recenzji, rest[i].nazwa, rest[i].autor, rest[i].widocznosc, rest[i].photoName, rest[i].opis, rest[i].data_dodania)
                this.simpleRecipes.push(temp);
            }
         });
    }

    getUserRecipes() {
        return this.simpleRecipes.filter(x => x.autor === this.userService.user.nazwa_uzytkownika);
    }

    getArrayUserRecipes() {
        return this.userRecipes;
    }

    getCategories() {
        this.http.get<Array<Category>>(`${this.categoryURL}`).subscribe( rest => { 
            let sorted = rest.sort((a, b) => (a.nazwa > b.nazwa) ? 1 : -1);
            this.categories = sorted; });
    }

    upload(file: any) {
        // Create form data
        const formData = new FormData(); 
            
        // Store form name as "file" with file data
        formData.append("file", file);
            
        this.http.post(this.recipeURL+'/SaveFile', formData).subscribe( rest => {
            console.log(rest)
        })
    }

    postRecipe(recipeName: string, description: string, fileName: string, newRecipeActions: Array<Action>, newRecipeIngredients: Array<Ingredient>, categoryArray: Array<number>) {
        let todayDate: Date = new Date();
        let newRecipe = new recipeSimple(-1, 0, recipeName, this.userService.user.nazwa_uzytkownika, 1, fileName, description, todayDate);

        this.http.post(this.recipeURL, newRecipe).subscribe( rest => {
            if (rest == "Dodano przepis") {
                this.http.get<Array<recipeSimple>>(`${this.recipeURL}?nazwa=${newRecipe.nazwa}`).subscribe( rest1 => {
                   newRecipeActions.forEach(action => {
                       action.id_przepisu = rest1[0].id_przepisu;
                       this.postActions(action);
                   });
                   newRecipeIngredients.forEach(ingredient => {
                        ingredient.id_przepisu = rest1[0].id_przepisu;
                        if(this.ingredientsName.some(function(element) {return element.nazwa === ingredient.nazwa;}))
                            this.postIngredients(ingredient);
                        else {
                            let newIngredientName = new SimpleIngredient(ingredient.nazwa);
                            this.http.post(this.ingredientNameURL, newIngredientName).subscribe( rest => { 
                                this.postIngredients(ingredient);
                            });
                        }
                    categoryArray.forEach(category => {
                        let recipeCat = new RecipeCategory(rest1[0].id_przepisu, category);
                        this.postRecipeCategory(recipeCat);
                    })
                });
                })
            }
        })
    }

    postActions(action: Action) {
        this.http.post(this.actionURL, action).subscribe( rest => {
            console.log(rest);
        })
    }

    postIngredients(ingredient: Ingredient) {
        console.log(ingredient)
        this.http.post(this.ingredientURL, ingredient).subscribe( rest => {
            console.log(rest);
        })
    }

    postRecipeCategory(category: RecipeCategory) {
        this.http.post(this.recipeCategoryURL, category).subscribe( rest => {
            console.log(rest);
        })
    }

    getUnits() {
        this.http.get<Array<Unit>>(`${this.unitsURL}`).subscribe( rest => { 
            this.units = rest;
        });
    }

    getIngredientsName() {
        this.http.get<Array<SimpleIngredient>>(`${this.ingredientNameURL}`).subscribe( rest => { 
            this.ingredientsName = rest;
        });
    }
}
