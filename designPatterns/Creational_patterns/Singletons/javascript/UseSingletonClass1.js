// const Scoreboard = require("./SingletonClass");  // wrong singleton import implementation
// const Scores = new Scoreboard(); // wrong singleton import implementation

const Scores = require("./SingletonClass"); // correct singleton import implementation


class Game {
  join(player) {
    Scores.join(player.getName());
  }

  scores() {
    return Scores.getBoard();
  }

  getWinner() {
    return Scores.sort()[0];
  }
}

module.exports = Game;
