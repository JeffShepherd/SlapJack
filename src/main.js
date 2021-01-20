//global variables and query selectors
var game = new Game();
var playerOnePile = document.querySelector('#playerOnePile');
var centralPile = document.querySelector('#centralPile');
var playerTwoPile = document.querySelector('#playerTwoPile');
var headerMessage = document.querySelector('#headerMessage');
var playerOneWins = document.querySelector('#playerOneWins');
var playerTwoWins = document.querySelector('#playerTwoWins');

//event listeners
window.addEventListener('load', loadGame);
document.addEventListener('keydown', function(event) {
  checkKeyPress(event);
});

//functions: data manipulation and data/DOM manipulation
function checkKeyPress(event) {
  var key = event.key;
  var player;
  if (key === 'f' || key === 'j') {
    player = assignPlayer(key);
    validateSlap(player);
  } else if (key === 'q' || key === 'p') {
    player = assignPlayer(key);
    validateDeal(key, player);
  } else {
    displayHeaderMessage(`Invalid key pressed!`);
  }
  console.log(game.playerOne.hand, game.playerTwo.hand, game.centralPile) //remove after testing
};

function assignPlayer(key) {
  if (key === 'f' || key === 'q') {
    return 1;
  } else if (key === 'j' || key === 'p') {
    return 2;
  }
};

function validateSlap(player) {
  if (getHandLength(player) === 0) { //if player's hand length is 0
    slapIfPlayerHasZero(player);
  } else {
    slapIfBothHaveCards(player);
  }
};

function slapIfPlayerHasZero(player) {
  if (game.slapAtEndGame()) { //check if top card in center is a jack
    game.winCentralPile(player); //player gets central pile
    updateDisplayAfterTurn(`Good slap! Player${player} is back in the game!!`);
  } else {
    winGame(switchPlayer(player));
  }
};

function slapIfBothHaveCards(player) {
  if (game.slap()) { //check for jack pair or sandwich
    if (game.centralPile[0].includes('jack') && getHandLength(switchPlayer(player)) === 0) { //win if jack on top and opp has 0 cards
      winGame(player);
    } else if (getHandLength(switchPlayer(player)) === 0) {
      updateOnBadSlap(player);
    } else {
      game.winCentralPile(player); //player wins middle cards and shuffle them into their deck
      updateDisplayAfterTurn(`Good slap! Player${player} takes central pile!!`); //show header message
    }
  } else {
    updateOnBadSlap(player);
  }
};

function updateOnBadSlap(player) {
  game.punishBadSlap(player); //bad slap (slapper loses top card of their hand and it goes to bottom of opponent's hand)
  updateDisplayAfterTurn(`Bad slap! Player${player} forfeits a card!!`); //show header message
};

function switchPlayer(player) {
  if (player === 1) {
    return 2;
  } else if (player === 2) {
    return 1;
  }
};

function validateDeal(key, player) { //refactor opportunity
  if (key === 'q' && game.playerTurn === 1 && getHandLength(1) > 0) { //key q - playerOne deal if it's their turn
    dealCard(player);
  } else if (key === 'p' && game.playerTurn === 2 && getHandLength(2) > 0) { //key p - playerTwo deal - playerTwo deal if it's their turn
    dealCard(player);
  } else {
    displayHeaderMessage(`Player${player} jumped the gun! It's not your turn!`);
  }
  switchTurnsAtEnd(); //if one player has no cards, make sure it's the other's turn
};

function dealCard(player) {
  game.moveCardToMiddle(); //move playerTwo top card to middle
  game.playerTurn = switchPlayer(player); //change player turn
  giveWinningPlayerDeckBack(player); //give deck back to player if they are winning and out of cards
  refreshCardImages();
};

function giveWinningPlayerDeckBack(player) { //give deck back to player if they are winning and out of cards
  if (getHandLength(1) !== 0 || getHandLength(2) !== 0) { //if either player has cards, exit function
    return;
  }
  if (player === 1) {
    game.winCentralPile(1); //shuffle middle deck and give to player1 if player2 has no
  } else if (player === 2) {
    game.winCentralPile(2); //shuffle middle deck and give to player
  }
};

function switchTurnsAtEnd() {
  if (getHandLength(1) === 0) {
    game.playerTurn = 2;
  } else if (getHandLength(2) === 0) {
    game.playerTurn = 1;
  }
};

function getHandLength(player) {
  if (player === 1) {
    return game.playerOne.hand.length;
  } else if (player === 2) {
    return game.playerTwo.hand.length;
  }
};

function loadGame() {
  game.resetGame(); //resets central pile and repopulates fullDeck
  refreshCardImages(); //update card images on DOM
  updateWinCountDisplay(); //reset win count display to reflect current wins
};

function winGame(player) {
  game.resetGame(); //sets p1 p2 and central pile to [], then shuffles and deals full deck
  game.updateWinCount(player); //adds 1 to winning player's win count
  updateDisplayAfterTurn(`PLAYER${player} WINS!`); //refresh card images and show win message
  updateWinCountDisplay(); //reset win count display to reflect current wins
};

//DOM manipulating functions
function updateDisplayAfterTurn(message) {
  refreshCardImages();
  displayHeaderMessage(message);
};

function updateWinCountDisplay() {
  playerOneWins.innerText = `${game.playerOne.wins} Wins`;
  playerTwoWins.innerText = `${game.playerTwo.wins} Wins`;
};

function refreshCardImages() {
  updatePlayerPileImage(1, playerOnePile);
  updatePlayerPileImage(2, playerTwoPile);
  if (game.centralPile.length === 0) {
    addClass(centralPile);
  } else {
    removeClass(centralPile);
    centralPile.src = `assets/${game.centralPile[0]}.png`;
  }
};

function updatePlayerPileImage(player, element) {
  if (getHandLength(player) === 0) {
    addClass(element);
  } else {
    removeClass(element);
  }
};

function displayHeaderMessage(message) {
  removeClass(headerMessage);
  headerMessage.innerText = message;
  setTimeout(function() {
    addClass(headerMessage);
  }, 7000)
};

function addClass(element, className) {
  element.classList.add(className || "hidden");
};

function removeClass(element, className) {
  element.classList.remove(className || "hidden");
};
