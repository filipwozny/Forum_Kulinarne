export class Review {
  constructor(

    public id_recenzji: number,
    public przepis_id_przepisu: number,
    public uzytkownik_nazwa_uzytkownika: string,
    public ocena: number,
    public widocznosc: boolean,
    public data_dodania: Date,
    public komentarz: string

  ) {};
}
