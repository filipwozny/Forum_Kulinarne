export class Ingredient {
    constructor(
    public skladnik_nazwa: string,
    public ilosc: number,
    public jednostka_nazwa: string,
    public przepis_id?: number
    ) {};
}