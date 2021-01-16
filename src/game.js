class Game {
  constructor() {
    this.playerOne = new Player(1);
    this.playerTwo = new Player(2);
    this.playerOneTurn = true;
    this.centralPile = [];
    this.fullDeck = ['blue-01', 'blue-02', 'blue-03', 'blue-04', 'blue-05', 'blue-06', 'blue-07', 'blue-08', 'blue-09', 'blue-10', 'blue-jack', 'blue-queen', 'blue-king',
      'gold-01', 'gold-02', 'gold-03', 'gold-04', 'gold-05', 'gold-06', 'gold-07', 'gold-08', 'gold-09', 'gold-10', 'gold-jack', 'gold-queen', 'gold-king',
      'green-01', 'green-02', 'green-03', 'green-04', 'green-05', 'green-06', 'green-07', 'green-08', 'green-09', 'green-10', 'green-jack', 'green-queen', 'green-king',
      'red-01', 'red-02', 'red-03', 'red-04', 'red-05', 'red-06', 'red-07', 'red-08', 'red-09', 'red-10', 'red-jack', 'red-queen', 'red-king',
      'wild'
    ];
  }
  shuffleDeck(deck) {
    for (var x = deck.length - 1; x > 0; x--) {
      var random = Math.floor(Math.random() * x);
      var temp = deck[x];
      deck[x] = deck[random];
      deck[random] = temp;
    }
  }
  dealFullDeck() {
    var counter = 0;
    for (var i = 0; i < this.fullDeck.length; i++)
      if (counter === 0) {
        this.playerOne.hand.unshift(this.fullDeck[i]);
        counter++;
      } else {
        this.playerTwo.hand.unshift(this.fullDeck[i]);
        counter--;
      }
  }
  moveCardToMiddle() {//make dynamic later
    this.centralPile.unshift(this.playerOne.hand.shift());
  }

  slap() {
    var evaluation = this.createRecentCards();

    if (evaluation[0] === 'k') {//check for jack
      return true;
    } else if (evaluation.length > 1 && evaluation[0] === evaluation[1]) {//check for pair
      return true;
    } else if (evaluation.length > 2 && evaluation[0] === evaluation[2]) {//check for sandwich
      return true;
    } else {//return flase if it's a bad slap
      return false;
    }
  }//idea: use one conditional if(checkforJack() \\ checkfor Pair() \\ checkfor Sandwich())

  createRecentCards() {
    var recentCards = [];
    for(var i = 0; i < this.centralPile.length; i++) {
      var splitCard = this.centralPile[i].split('');
      recentCards.push(splitCard[splitCard.length - 1])
      if(recentCards.length === 3 || this.centralPile.length === recentCards.length) {
        return recentCards;
      }
    }
  }

  updateWinCount(player) {
    this.player.wins++;
    player.saveWinsToStorage();
  }

  resetGame() {
    this.playerOne.hand = [];
    this.playerOne.hand = [];
    this.centralPile = [];
    this.shuffleDeck(this.fullDeck);
    this.dealFullDeck();
  }
}
