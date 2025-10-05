// Example 2
const Game = require("./UseSingletonClass1");
const Player = require("./UseSingletonClass2");

const Pete = new Player("Pete");
const Mike = new Player("Mike");
const Poker = new Game();

Poker.join(Pete);
Poker.join(Mike);

Pete.wins(20);

Mike.wins(30);
Mike.wins(40);

Pete.wins(1000);
Pete.loses(500);

console.log("Scoreboard: ", Poker.scores());
console.log(`Winner: ${Poker.getWinner().name} with ${Poker.getWinner().points} points`);
