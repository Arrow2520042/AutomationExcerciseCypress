// aby uruchomić należy wykonać w terminalu, będąc w folderze w którym znajdują się pliki:
// żeby wejść do folderu 'diff' z poziomu folderu 'cypress' należy użyć:
// cd cypress/diff/
// tsc .\testyTs.ts -> utworzy sie testyTs.js
// node .\testyTs.js

// //---------------------------------------------------------------------------------
// // kontrolowanie typów
// let age = 25;
// age = "dwadzieścia pięć";                                  // otrzymamy błąd, ponieważ nie możemy przypisać wartości typu string do zmiennej, która została zainicjalizowana jako number

// console.log(age);

// //---------------------------------------------------------------------------------
// // typy w funkcji
// function add(a: number, b: number): number {
//     return a + b;
//   }
  
// console.log(add(2, "3"));                                  // błąd, ponieważ nie można zsumować wartości number i string

// function addWithOr(a: number, b: number|string): number {  // można wykorzystać operator '|' aby określić, że parametr 'b' jest typu number lub string
//   return a + b;                                            // ale tutaj też otrzymamy błąd, ponieważ nie można zsumować wartości number i string
// }

// console.log(addWithOr(2, "3"));                            // w tym wypadku nie ma błędu

// //---------------------------------------------------------------------------------
// // zabezpieczenie przed użyciem nieistniejących właściwości
// const user = {
//     name: "Adam",
//     age: 30
//   };
  
// user.email = "adam@example.com";                           // obiekt 'user' nie ma właściwości 'email', dlatego nie możemy jej wykorzystać

// //---------------------------------------------------------------------------------
// // utworzenie interfejsu i jego wykorzystanie

// interface User {
//     name: string;
//     age: number;
//     email?: string;
//   }

// const userWithInterface: User = {
//     name: "Adam",
//     age: 30
// };
// const userWithInterface2: User = {
//   name: "Adam",
//   age: 30,
//   email: 'example@mail.com',
// };

// //---------------------------------------------------------------------------------
// // kompilacja przed uruchomieniem kodu
// console.log(jhon);                                           // od razu dostajemy informację, że obiekt 'jhon' nie istnieje