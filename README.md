# Forum Kulinarne

### Opis projektu 

Aplikacja internetowa komunikująca się z lokalną bazą danych, która umożliwia dzielenie się przepisami pomiędzy różnymi użytkownikami. Każdy przepis zawiera opis czynności, potrzebne składniki, czas przygotowania, kategorie do której należy(deser itp.), kraj oraz region pochodzenia, średnią ocen oraz komentarze.
<br /> <br /> <br />
Wymagania funkcjonalne:

- możliwość wyszukiwania przepisów po nazwie

- możliwość wyszukiwania przepisów po składnikach

- możliwość wyszukiwania przepisów po kategorii do której należą
<br /> <br /> <br />

Możliwość niezalogowanych użytkowników:

- możliwość zalogowania użytkownika

- możliwość rejestracji nowego użytkownika

- przeglądania przepisów

- przeglądanie recenzji
<br /> <br /> <br />

Możliwości zalogowanych użytkowników:

- dodawania nowych przepisów

- recenzowania przepisów

- edycji własnych przepisów

- zgłoszenia przepisu w celu weryfikacji przez admina

- zgłoszenia recenzji w celu weryfikacji przez admina

- usunięcie swojego konta(powoduje to zmianę autora przepisów danego użytkownika na „autor nieznany” i usuwa jego recenzje)
<br /> <br /> <br />

Możliwość administratorów:

- usunięcie dowolnego przepisu(np. Zgłoszonego do weryfikacji)

- usunięcie dowolnej recenzji(np. Zgłoszonej do weryfikacji)

- usunięcie dowolnego użytkownika(powoduje to zmianę autora przepisów danego użytkownika na „autor nieznany” i usuwa jego recenzje )
<br /> <br /> <br />

Wymagania niefunkcjonalne:

- aplikacja webowa

- GUI dostępne na stronie www

- aplikacja dopasowuję się do aktualnego wymiaru ona przeglądarki

- menu dostępne z każdego poziomu aplikacji(za wyjątkiem strony logowania)

- wyodrębniona strona logowania
<br /> <br /> <br />
### Screenshots
# Strona główna
![Strona główna](https://user-images.githubusercontent.com/70282972/164002149-9f443864-458a-4de8-971a-42693daba8d7.png)
# Panel logowania
![Panel logowania](https://user-images.githubusercontent.com/70282972/164002145-374d73c7-511b-44ca-b003-69a4a9a5a44b.png)
# Panel rejestracji
![Panel rejestracji](https://user-images.githubusercontent.com/70282972/164002147-9c46e612-3ca6-4a46-9809-4f6c6fedf0b8.png)
# Panel admina
![Panel admina](https://user-images.githubusercontent.com/70282972/164002140-dcfed3b3-a615-412a-96dc-514a22f9157f.png)
# Strona pojedyńczego przepisu
![Strona przepisu](https://user-images.githubusercontent.com/70282972/164002151-a776fd87-eba5-45c0-a8e1-c2bf3d8d7983.png)
# Zakładka "Dodaj przepis"
![Nowy przepis](https://user-images.githubusercontent.com/70282972/164002154-7af6806d-add7-4e7e-8eda-c7bd07b51499.png)

<br /> <br /> <br />

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


