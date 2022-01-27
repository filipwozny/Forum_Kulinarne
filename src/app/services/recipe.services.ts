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
import { Router } from '@angular/router';
import { Review } from 'app/models/review';
import { Report } from 'app/models/report';



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
    private reviewURL = 'http://localhost:64231/api/recenzje' ;

    private reportedRecipeURL = 'http://localhost:64231/api/zgloszone_przepisy' ;
    private reportedReviewURL = 'http://localhost:64231/api/zgloszone_recenzje' ;

    public categories: Array<Category> = [];

    public simpleRecipes: Array<recipeSimple> = [];
    public currentdisplayRecipes: Array<recipeSimple> = [];
    public currentRecipe: recipeSimple;
    public userRecipes: Array<recipeSimple> = [];
    public units: Array<Unit> = [];
    public ingredientsName: Array<SimpleIngredient> = [];
    public currentRecipeActions: Array<Action> = [];
    public currentRecipeIngredients: Array<Ingredient> = [];
    public AllReviews: Array<Review> = [];
    public currentReviews: Array<Review> = [];
    public reportForm: Report;

    constructor(private http: HttpClient, private userService: UserService, private router: Router) {
        this.getSimpleRecipes();
        this.currentRecipe = this.simpleRecipes[0];
        this.userRecipes = this.getUserRecipes();
        this.reportForm = new Report("","",0,"", new Date());
        this.getCategories();
        this.getUnits();
        this.getIngredientsName();
        this.getAllReviews();
    }

    update() {
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
            this.getcurrentdisplaySimpleRecipes("Wszystkie");
         });
    }

    getcurrentdisplaySimpleRecipes(category: string) {
        this.currentdisplayRecipes = [];
        if(category == 'Wszystkie'){
            for(let i = 0; i < this.simpleRecipes.length; i++) {
                console.log(this.simpleRecipes[i].widocznosc);
                if(this.simpleRecipes[i].widocznosc) {
                    this.currentdisplayRecipes.push(this.simpleRecipes[i]);
                }
            }
        }
        else{
        this.http.get<Array<recipeSimple>>(`${this.recipeCategoryURL}?id=${category}`).subscribe( rest => {
            for(let i = 0; i < rest.length; i++) {
                let temp = new recipeSimple(rest[i].id_przepisu, rest[i].srednia_recenzji, rest[i].nazwa, rest[i].autor, rest[i].widocznosc, rest[i].photoName, rest[i].opis, rest[i].data_dodania)
                if(temp.widocznosc) {
                    this.currentdisplayRecipes.push(temp);
                }
                console.log(rest[i]);
            }
         });
        }
    }

    getcurrentReviews(){
      this.http.get<Array<Review>>(`${this.reviewURL}?id=${this.currentRecipe.id_przepisu}`).subscribe( rest => {
        this.currentReviews = rest;
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

    getAllReviews() {
        this.http.get<Array<Review>>(`${this.reviewURL}`).subscribe( rest => {
        this.AllReviews = [];
        for(let i = 0; i < rest.length; i++) {
          let temp = new Review(rest[i].id_recenzji, rest[i].przepis_id_przepisu, rest[i].uzytkownik_nazwa_uzytkownika, rest[i].ocena, rest[i].widocznosc, rest[i].data_dodania, rest[i].komentarz)
          this.AllReviews.push(temp);
      } });
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

    postSuccessful() {
        this.router.navigate(['/']);
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
                        ingredient.przepis_id = rest1[0].id_przepisu;
                        if(this.ingredientsName.some(function(element) {return element.nazwa === ingredient.skladnik_nazwa;}))
                            this.postIngredients(ingredient);
                        else {
                            let newIngredientName = new SimpleIngredient(ingredient.skladnik_nazwa);
                            this.http.post(this.ingredientNameURL, newIngredientName).subscribe( rest => {
                                this.postIngredients(ingredient);
                            });
                        }
                    categoryArray.forEach(category => {
                        let recipeCat = new RecipeCategory(rest1[0].id_przepisu, category);
                        this.postRecipeCategory(recipeCat);
                    })
                });
                this.update();
                this.postSuccessful();
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

    getCurrentRecipeActions() {
        this.http.get<Array<Action>>(`${this.actionURL}?id=${this.currentRecipe.id_przepisu}`).subscribe( rest => {
            let sorted = rest.sort((a, b) => (a.kolejnosc_w_przepisie > b.kolejnosc_w_przepisie) ? 1 : -1);
            this.currentRecipeActions = sorted;
        });
    }

    getCurrentRecipeIngerdients() {
        this.http.get<Array<Ingredient>>(`${this.ingredientURL}?id=${this.currentRecipe.id_przepisu}`).subscribe( rest => {
            let sorted = rest.sort((a, b) => (a.skladnik_nazwa > b.skladnik_nazwa) ? 1 : -1);
            this.currentRecipeIngredients = sorted;
            console.log(sorted)
        });
    }

    postReview(comment: string, rating: number) {
        let todayDate: Date = new Date();
        let newReview = new Review(0,this.currentRecipe.id_przepisu, this.userService.user.nazwa_uzytkownika, rating, true, todayDate, comment);

        this.http.post(this.reviewURL, newReview).subscribe( rest => {
            window.location.reload();
        })
    }

    setReportType(type: string) {
        this.reportForm.reportType = type;
    }

    postRecipeReport() {
        let report = {'opis':this.reportForm.opis, 'przepis_id_przepisu':this.reportForm.id};
        
        this.http.post(this.reportedRecipeURL, report).subscribe( rest => {
            console.log(rest);
            this.router.navigate(['/recipe']);
        })
    }

    postReviewReport() {
        let report = {'opis':this.reportForm.opis, 'recenzje_id_recenzji':this.reportForm.id};
        this.http.post(this.reportedReviewURL, report).subscribe( rest => {
            console.log(rest);
            this.router.navigate(['/recipe']);
        })
    }

    hideReview(id: number, hide: boolean) {
        let order = {'widzocnosc':hide, 'id_recenzji':id};
        this.http.put(this.reviewURL, order).subscribe(rest => {});
    }

    hideRecipe(id: number, hide: boolean) {
        let order = {'widzocnosc':hide, 'id_przepisu':id};

        this.http.put(this.recipeURL, order).subscribe(rest => {});
    }
}
