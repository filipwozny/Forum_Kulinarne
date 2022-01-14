export class recipeSimple {
    constructor(
        public id_przepisu: number,
        public nazwa: string,
        public widocznosc: number,
        public photoName: string,
        ) {};
}

export class recipeDetails {
    constructor(
        public id_przepisu: number,
        public srednia_recenzji: number,
        public autor: string,
        public nazwa: string,
        public widocznosc: number,
        public photoName: string,
    ) {};
}