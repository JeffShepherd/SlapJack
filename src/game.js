class Game {
  constructor() {
    this.playerOne = new Player(1);
    this.playerTwo = new Player(2);
    this.playerOneTurn = true;
    this.centralPile = [];
    this.fullDeck = [];
  }
}
