class Game {
  constructor() {
    this.playerOne = new Player(1);
    this.playerTwo = new Player(2);
    this.playerTurn = 1;
    this.centralPile = [];
    this.fullDeck = ['blue-01', 'blue-02', 'blue-03', 'blue-04', 'blue-05', 'blue-06', 'blue-07', 'blue-08', 'blue-09', 'blue-10', 'blue-jack', 'blue-queen', 'blue-king',
      'gold-01', 'gold-02', 'gold-03', 'gold-04', 'gold-05', 'gold-06', 'gold-07', 'gold-08', 'gold-09', 'gold-10', 'gold-jack', 'gold-queen', 'gold-king',
      'green-01', 'green-02', 'green-03', 'green-04', 'green-05', 'green-06', 'green-07', 'green-08', 'green-09', 'green-10', 'green-jack', 'green-queen', 'green-king',
      'red-01', 'red-02', 'red-03', 'red-04', 'red-05', 'red-06', 'red-07', 'red-08', 'red-09', 'red-10', 'red-jack', 'red-queen', 'red-king'
    ];
  };

  shuffleDeck(deck) { //tested and working
    for (var x = deck.length - 1; x > 0; x--) {
      var randomIndex = Math.floor(Math.random() * x);
      var currentIndex = deck[x];
      deck[x] = deck[randomIndex];
      deck[randomIndex] = currentIndex;
    }
  };

  winCentralPile(player) {
    if (player === 1) {
      this.playerOne.hand = (this.playerOne.hand.concat(this.centralPile));
      this.shuffleDeck(this.playerOne.hand);
    } else {
      this.playerTwo.hand = (this.playerTwo.hand.concat(this.centralPile));
      this.shuffleDeck(this.playerTwo.hand);
    }
    this.centralPile = [];
  };

  dealFullDeck() { //tested and working
    var counter = 0;
    for (var i = 0; i < this.fullDeck.length; i++)
      if (counter === 0) {
        this.playerOne.hand.unshift(this.fullDeck[i]);
        counter++;
      } else {
        this.playerTwo.hand.unshift(this.fullDeck[i]);
        counter--;
      }
  };

  moveCardToMiddle() { //tested and working
    if (this.playerTurn === 1) {
      this.centralPile.unshift(this.playerOne.playCard());
    } else {
      this.centralPile.unshift(this.playerTwo.playCard());
    }
  };

  punishBadSlap(player) {
    if (player === 1) {
      this.playerTwo.hand.push(this.playerOne.playCard());
    } else {
      this.playerOne.hand.push(this.playerTwo.playCard());
    }
  };

  slap() {
    if (this.centralPile.length === 0) {
      return false;
    }
    var evaluation = this.createRecentCards();
    if (this.checkForJack(evaluation) || this.checkForPair(evaluation) || this.checkForSandwich(evaluation)) {
      return true;
    } else {
      return false;
    }
  };

  slapAtEndGame() {
    if (this.centralPile.length === 0) {
      return false;
    }
    var evaluation = this.createRecentCards();
    if (this.checkForJack(evaluation)) {
      return true;
    } else {
      return false;
    }
  };

  checkForJack(cardsToEvaluate) {
    if (cardsToEvaluate[0] === 'k') {
      return true;
    }
  };

  checkForPair(cardsToEvaluate) {
    if (cardsToEvaluate.length > 1 && cardsToEvaluate[0] === cardsToEvaluate[1]) {
      return true;
    }
  };

  checkForSandwich(cardsToEvaluate) {
    if (cardsToEvaluate.length > 2 && cardsToEvaluate[0] === cardsToEvaluate[2]) {
      return true;
    }
  };

  createRecentCards() { //tested and working
    var recentCards = [];
    for (var i = 0; i < this.centralPile.length; i++) {
      var splitCard = this.centralPile[i].split('');
      recentCards.push(splitCard[splitCard.length - 1]);
      if (recentCards.length === 3 || this.centralPile.length === recentCards.length) {
        return recentCards;
      }
    }
  };

  updateWinCount(player) { //works but needs to be made dynamic
    if (player === 1) {
      this.playerOne.wins++;
      this.playerOne.saveWinsToStorage();
    } else {
      this.playerTwo.wins++;
      this.playerTwo.saveWinsToStorage();
    }
  };

  resetGame() { //tested and working
    this.playerOne.hand = [];
    this.playerTwo.hand = [];
    this.centralPile = [];
    this.playerTurn = 1;
    this.shuffleDeck(this.fullDeck);
    this.dealFullDeck();
  }
};
