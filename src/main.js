var game = new Game();
var playerOnePile = document.querySelector('#playerOnePile');
var centralPile = document.querySelector('#centralPile');
var playerTwoPile = document.querySelector('#playerTwoPile');
var headerMessage = document.querySelector('#headerMessage');
var playerOneWins = document.querySelector('#playerOneWins');
var playerTwoWins = document.querySelector('#playerTwoWins');

window.addEventListener('load', loadGame);
document.addEventListener('keydown', function(event) {
  checkKeyPress(event);
});

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
};

function assignPlayer(key) {
  if (key === 'f' || key === 'q') {
    return 1;
  } else if (key === 'j' || key === 'p') {
    return 2;
  }
};

function validateSlap(player) {
  if (getHandLength(player) === 0) {
    slapIfPlayerHasZero(player);
  } else {
    slapIfBothHaveCards(player);
  }
};

function slapIfPlayerHasZero(player) {
  if (game.slapAtEndGame()) {
    game.winCentralPile(player);
    updateDisplayAfterTurn(`Good slap! Player${player} is back in the game!!`);
  } else {
    winGame(switchPlayer(player));
  }
};

function slapIfBothHaveCards(player) {
  if (game.slap()) {
    if (game.centralPile[0].includes('jack') && getHandLength(switchPlayer(player)) === 0) {
      winGame(player);
    } else if (getHandLength(switchPlayer(player)) === 0) {
      updateOnBadSlap(player);
    } else {
      game.winCentralPile(player);
      updateDisplayAfterTurn(`Good slap! Player${player} takes central pile!!`);
    }
  } else {
    updateOnBadSlap(player);
  }
};

function updateOnBadSlap(player) {
  game.punishBadSlap(player);
  updateDisplayAfterTurn(`Bad slap! Player${player} forfeits a card!!`);
};

function switchPlayer(player) {
  if (player === 1) {
    return 2;
  } else if (player === 2) {
    return 1;
  }
};

function validateDeal(key, player) {
  if (key === 'q' && game.playerTurn === 1 && getHandLength(1) > 0) {
    dealCard(player);
  } else if (key === 'p' && game.playerTurn === 2 && getHandLength(2) > 0) {
    dealCard(player);
  } else {
    displayHeaderMessage(`Player${player} jumped the gun! It's not your turn!`);
  }
  switchTurnsAtEnd();
};

function dealCard(player) {
  game.moveCardToMiddle();
  game.playerTurn = switchPlayer(player);
  giveWinningPlayerDeckBack(player);
  refreshCardImages();
};

function giveWinningPlayerDeckBack(player) {
  if (getHandLength(1) !== 0 || getHandLength(2) !== 0) {
    return;
  }
  if (player === 1) {
    game.winCentralPile(1);
  } else if (player === 2) {
    game.winCentralPile(2);
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
  game.resetGame();
  refreshCardImages();
  updateWinCountDisplay();
};

function winGame(player) {
  game.resetGame();
  game.updateWinCount(player);
  updateDisplayAfterTurn(`PLAYER${player} WINS!`);
  updateWinCountDisplay();
};

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
  }, 5000)
};

function addClass(element, className) {
  element.classList.add(className || "hidden");
};

function removeClass(element, className) {
  element.classList.remove(className || "hidden");
};
