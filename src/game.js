class Game {
  constructor() {
    this.playerOne = new Player(1);
    this.playerTwo = new Player(2);
    this.playerOneTurn = true;
    this.centralPile = [];
    this.fullDeck = [1,2,3,4,5];
  }
  shuffleDeck() {

  }
  dealFullDeck() {
    var counter = 0;
    for(var i = 0; i < this.fullDeck.length; i++)
      if(counter === 0) {
        this.playerOne.hand.unshift(this.fullDeck[i]);
        counter++;
      } else {
        this.playerTwo.hand.unshift(this.fullDeck[i]);
        counter--;
      }
  }
  moveCardToMiddle() {

  }
  slap() {

  }
  updateWinCount(player) {
    this.player.wins++;
    player.saveWinsToStorage()   ; 
  }
  resetGame() {

  }
}
