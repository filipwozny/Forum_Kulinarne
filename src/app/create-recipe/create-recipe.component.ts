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
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent {

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



    constructor(public recipeService: RecipeService, private router: Router){
        this.url = '/assets/default.png';
        this.newRecipeActions = [];
        this.newRecipeIngredients = [];
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
    }

    submitRecipe() {
          this.recipeService.upload(this.selectedFile.file);
    }

    addAction() {
        if(this.textArea != "") {
            let action = new Action((this.newRecipeActions.length+1), this.textArea);
            this.newRecipeActions.push(action);
            this.textArea = "";
        }     
    }

    deleteAction(numer: number) {
        this.newRecipeActions.splice(numer,1);
        for(let i = numer; i < this.newRecipeActions.length; i++) {
            this.newRecipeActions[i].kolejnosc_w_przepisie = i+1;
        }
    }

    addIngredients() {
        if(this.inputIngredient != "" && this.quantity != 0 && this.chosenUnit != null) {
            let ingredient = new Ingredient(this.inputIngredient, this.quantity, this.chosenUnit);
            this.newRecipeIngredients.push(ingredient);
            this.inputIngredient = "";
            this.quantity = 0;
            this.chosenUnit = null;
        }   
    }

    deleteIngredients(nazwa: string) {
        var index = this.newRecipeIngredients.findIndex(x => x.skladnik_nazwa === nazwa);
        this.newRecipeIngredients.splice(index,1);
    }


    publish() {
        this.recipeService.upload(this.selectedFile.file);
        let recipeNumber = this.recipeService.simpleRecipes.length;
        let categoryID: Array<number> = [];
        this.categoryArray.forEach(element => {
            if(element >= 1) {
                categoryID.push(element)
            }    
        });
        this.recipeService.postRecipe(this.recipeName, this.description, this.fileName, this.newRecipeActions, this.newRecipeIngredients, categoryID)
    }
}
