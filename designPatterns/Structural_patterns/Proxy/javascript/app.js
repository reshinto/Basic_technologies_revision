const {lock, unlock} = require("./Vault.js");
const password = "thisisastrongpassword123";

const obj = {
  name: "John Doe",
  age: 32,
  city: "Chicago",
  country: "US",
};

const person = lock(obj, password);
console.log(person);

person.favColor = "Red";
person.favFruit = "Apple";
console.log(person);

const unlocked = unlock(person, password);
console.log(unlocked);
unlocked.food = "Pizza"; // gets an error as is readonly
