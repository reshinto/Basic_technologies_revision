// const Scoreboard = require("./SingletonClass");  // wrong singleton import implementation
// const Scores = new Scoreboard(); // wrong singleton import implementation

const Scores = require("./SingletonClass"); // correct singleton import implementation


class Player {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  wins(points) {
    Scores.update(this.name, points);
  }

  loses(points) {
    Scores.update(this.name, -points);
  }
}

module.exports = Player;
