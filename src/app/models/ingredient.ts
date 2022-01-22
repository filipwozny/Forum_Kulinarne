export class Ingredient {
    constructor(
    public nazwa: string,
    public ilosc: number,
    public jednostka: string,
    public id_przepisu?: number
    ) {};
}