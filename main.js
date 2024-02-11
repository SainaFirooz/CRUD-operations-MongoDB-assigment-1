// console log menu

import prompt from "prompt-sync";

const p = prompt();

console.log("Menu");
console.log("1. Show all movies.");
console.log("2. Add new movie.");
console.log("3. Update existing movie.");
console.log("4. Delete movie.");
console.log("5. Exist menu.");

let input = p("Make a choice by entering a number: ");

let runApp = true;

while(runApp){
    if (input == "5"){
        runApp = false;
    }
}

