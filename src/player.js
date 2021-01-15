class Player {
  constructor(id) {
    this.id = id;
    this.wins = 0;
    this.hand = [];
  }

  playCard() {
    if (this.hand.length !== 0) {
      //add card to central pile
    } else {
      //show a message saying you have no cards to play?
    }
  }

  saveWinsToStorage() {
    var wins = JSON.stringify(this.wins);
    localStorage.setItem(`player${this.id}`, wins);
  }
}
