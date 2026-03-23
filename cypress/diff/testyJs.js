// aby uruchomić należy wykonać w terminalu, będąc w folderze w którym znajdują się pliki:
// żeby wejść do folderu 'diff' z poziomu folderu 'cypress' należy użyć:
// cd cypress/diff/
// node .\testyJs.js

// //---------------------------------------------------------------------------------
// // brak kontroli typów
// var age = 25;          
// age = "dwadzieścia pięć";                                  // nie otrzymamy błędu
// console.log(age);

// //---------------------------------------------------------------------------------
// // typy w funkcji
// function add(a, b) {
//     return a + b;
//   }

// console.log(add(2, "3"));                                      // nie otrzymamy błędu, za to wypisany zostanie wynik "23"

// //---------------------------------------------------------------------------------
// // brak interfejsów
// const user = {
//     name: "Adam",
//     age: 30
// };
  
// user.email = "adam@example.com";                               // nie otrzymamy błędu, możemy wykonać taką operację w JS

// console.log(user.email);                                       // po wypisaniu 'user.email' zobaczymy, że taka właściwość została dodana mimo, że jej wcześniej nie było
// console.log(user);                                             // po wypisaniu obiektu 'user' zobaczymy wszystkie właściwości łącznie z 'email'

// // // //---------------------------------------------------------------------------------
// // kompilacja dopiero po uruchomieniu kodu
// console.log(jhon);                                             // błąd otrzymamy dopiero, gdy uruchomimy kod