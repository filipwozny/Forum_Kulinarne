import { Data } from "@angular/router";

export class ReviewNotified{
  constructor(
    public id_zgloszenia: number,
    public opis: string,
    public status_zgloszenia: string,
    public data_zgloszenia: Data
    ) {};


}
