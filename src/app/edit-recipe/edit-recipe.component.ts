import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.services';
import { recipeSimple } from '../models/recipe';
import { Action } from '../models/action';
import { Router } from '@angular/router';
import { Ingredient } from 'app/models/ingredient';
import { SimpleIngredient } from 'app/models/ingredient-simple';
import { Category } from 'app/models/category';


class ImageSnippet {
    constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {

    selectedFile: ImageSnippet | any;
    imageInput: any;
    url:any;
    fileName: string = "anonymous.png";

    public recipeName: string = "";
    public description: string = "";
    public categoryArray: Array<number> = [-1,-1,-1];
    newRecipeActions: Array<Action>;
    public textArea: string = "";
    newRecipeIngredients: Array<Ingredient>;
    public inputIngredient: string = "";
    public quantity: number = 0;
    public chosenUnit: string | null = null;

    public changedPhoto: boolean = false;
    public changedActions: boolean = false;
    public changedIngredients: boolean = false;
    public changedCategories: boolean = false;



    constructor(public recipeService: RecipeService, private router: Router){
        this.recipeName = this.recipeService.currentRecipe.nazwa;
        this.description = this.recipeService.currentRecipe.opis;
        this.categoryArray = this.recipeService.currentRecipeCategories;
        this.url = this.recipeService.photoURL;
        this.fileName = this.recipeService.currentRecipe.photoName;
        this.newRecipeActions = this.getRecipeActions();
        this.newRecipeIngredients = this.getRecipeIngredients();
    }

    getRecipeActions() {
        return this.recipeService.currentRecipeActions;
    }

    getRecipeIngredients() {
        return this.recipeService.currentRecipeIngredients;
    }

    processFile(imageInput: any) {
        this.imageInput = imageInput;
        const file: File = imageInput.files[0];
        const reader = new FileReader();
    
        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
        });

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
			this.url = reader.result; 
            this.fileName = file.name;
		}
        this.changedPhoto = true;
    }

    changeCategories() {
        this.changedCategories = true;
    }

    addAction() {
        if(this.textArea != "") {
            let action = new Action((this.newRecipeActions.length+1), this.textArea);
            this.newRecipeActions.push(action);
            this.textArea = "";
            this.changedActions = true;
        }     
    }

    deleteAction(numer: number) {
        this.newRecipeActions.splice(numer,1);
        for(let i = numer; i < this.newRecipeActions.length; i++) {
            this.newRecipeActions[i].kolejnosc_w_przepisie = i+1;
        }
        this.changedActions = true;
    }

    addIngredients() {
        if(this.inputIngredient != "" && this.quantity != 0 && this.chosenUnit != null) {
            let ingredient = new Ingredient(this.inputIngredient, this.quantity, this.chosenUnit);
            this.newRecipeIngredients.push(ingredient);
            this.inputIngredient = "";
            this.quantity = 0;
            this.chosenUnit = null;
            this.changedIngredients = true;
        }   
    }

    deleteIngredients(nazwa: string) {
        var index = this.newRecipeIngredients.findIndex(x => x.skladnik_nazwa === nazwa);
        this.newRecipeIngredients.splice(index,1);
        this.changedIngredients = true;
    }


    publish() {
        if(this.changedPhoto == true) {
            this.recipeService.upload(this.selectedFile.file);
        }
        
        let categoryID: Array<number> = [];
        this.categoryArray.forEach(element => {
            if(element >= 1) {
                categoryID.push(element)
            }    
        });
        this.recipeService.postEditRecipe(this.recipeName, this.description, this.fileName, this.newRecipeActions, this.newRecipeIngredients, 
                        categoryID, this.changedActions, this.changedIngredients, this.changedCategories)
    }
}
