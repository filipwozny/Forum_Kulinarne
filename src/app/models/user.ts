export class User {
    constructor(
    public nazwa_uzytkownika: string,
    public haslo: string,
    public imie: string,
    public nazwisko: string,
    public czy_admin: number,
    public numer_telefonu?: number,
    public mail?: string,
    ) {};
}
