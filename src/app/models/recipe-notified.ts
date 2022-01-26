import { Data } from "@angular/router";

export class RecipeNotified{
  constructor(
    public id_zgloszenia: number,
    public opis: string,
    public przepis_id_przepisu: number,
    public status_zgloszenia: string,
    public data_zgloszenia: Data
    ) {};


}
