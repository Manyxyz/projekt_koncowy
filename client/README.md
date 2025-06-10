## Projekt zaliczeniowy z laboratorium "Programowanie aplikacji internetowych"

## Tematyka projektu: Platforma Quizowa (QuizzCamp)

## Autor: Maciej Targoński

## Funkcjonalności:
- rejestracja i logowanie użytkowników (uwierzytelnianie JWT)
- tworzenie, edycja i usuwanie quizów przez użytkownika
- rozwiązywanie quizów i zapisywanie wyników
- przeglądanie dostępnych quizów oraz własnych quizów
- podgląd własnych wyników oraz najlepszych wyników wszystkich użytkowników
- edycja profilu: zmiana nazwy użytkownika, zmiana hasła, usuwanie konta
- panel potwierdzeń i powiadomień (modale, toast)

## Narzędzia i technologie:
- strona serwera: Node.js, Express.js, Mongoose, MongoDB, JWT, bcrypt, dotenv, express-validator, cors
- baza danych: MongoDB, Mongoose (ORM)
- strona klienta: React, React Router DOM, Axios, CSS-in-JS
- stylowanie: CSS-in-JS, własne style
- powiadomienia: własny komponent Toast

## Wymagania

Wersje programów wykorzystane do tworzenia aplikacji (aplikacja nie została przetestowana z kompatybilnością wcześniejszych wersji):
- Node.js v22.13.0
- npm 10.9.2
- MongoDB Atlas

### Kluczowe zależności backendu:
- express ^5.1.0
- mongoose ^8.15.1
- bcrypt ^6.0.0
- dotenv ^16.5.0
- express-validator ^7.2.1
- jsonwebtoken ^9.0.2
- cors ^2.8.5

### Kluczowe zależności frontendu:
- react ^19.1.0
- react-router-dom ^7.6.2
- axios ^1.9.0
- react-scripts 5.0.1

## Uruchomienie

1. Sklonuj repozytorium do wybranego folderu.
2. Przejdź do folderu `server`:
    - Zainstaluj zależności:  
      `npm install`
    - Uruchom serwer backendu:  
      `node server.js`
3. Przejdź do folderu `client`:
    - Zainstaluj zależności:  
      `npm install`
    - Uruchom aplikację frontendową:  
      `npm start`
4. Otwórz aplikację w przeglądarce pod adresem:  
   `http://localhost:3000`

## Uwagi

- Domyślnie backend nasłuchuje na porcie 5000, frontend na 3000.
- Po rejestracji i zalogowaniu można tworzyć własne quizy oraz rozwiązywać quizy innych użytkowników.
- W przypadku problemów z połączeniem z bazą MongoDB sprawdzić poprawność danych w pliku `.env`.

## Konta testowe

-   **Test**
    -   Login: asd@wp.pl.com
    -   Hasło: asdasd

Możesz utworzyć własne konta testowe poprzez formularz rejestracji.

---