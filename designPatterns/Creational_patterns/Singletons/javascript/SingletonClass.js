class Scoreboard {
  constructor() {
    this.board = [];
  }

  join(name) {
    this.board.push({
      name,
      points: 0,
    });
  }

  leave(name) {
    this.board = this.board.filter((player) => player.name !== name);
  }

  update(name, points) {
    const player = this.board.findIndex((player) => player.name === name);
    if (player > -1) {
      this.board[player].points += points;
    }
  }

  getBoard() {
    return this.board;
  }

  sort() {
    return this.board.sort((x, y) => y.points - x.points);
  }
}

/*
scoreboard will show two players, but their points are 0
the reason is because although module is cached,
scoreboard is being instantiated to 2 separate instances into Game class and Player class
therefore it does not behave like a singleton

To make this into a singleton, both the Player and Game class must access a single and common instance of the scoreboard class
*/
// module.exports = Scoreboard;  // wrong singleton implementation

module.exports = new Scoreboard(); // correct singleton implementation
