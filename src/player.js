class Player {
  constructor(id) {
    this.id = id;
    this.wins = 0;
    this.hand = [];
  }

  playCard() {
    var test = this.hand.shift();
    return test;
  }

  saveWinsToStorage() {
    var wins = JSON.stringify(this.wins);
    localStorage.setItem(`player${this.id}`, wins);
  }

  getWinsFromStorage() {
    var savedData = localStorage.getItem(`player${this.id}`);
    var wins = JSON.parse(savedData);
    return wins;
  }
}
