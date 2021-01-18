//global variables and query selectors
var game = new Game();
var playerOnePile = document.querySelector('#playerOnePile');
var centralPile = document.querySelector('#centralPile');
var playerTwoPile = document.querySelector('#playerTwoPile');
var headerMessage = document.querySelector('#headerMessage')


//event listeners
window.addEventListener('load', loadGame);
document.addEventListener('keydown', function(event) {
  checkKeyPress(event);
})


//functions
function checkKeyPress(event) {
  var key = event.keyCode;
  var player;
  if (key === 70) {
    player = 1;
    checkForSlapKey(player); //key f - playerOne slap
  } else if (key === 74) {
    player = 2;
    checkForSlapKey(player); //key j - playerTwo slap
  }
  checkForDealKey(key, player);
  console.log(game.playerOne.hand, game.playerTwo.hand, game.centralPile)//remove after testing
}


function checkForSlapKey(player) {
  if (getHandLength(player) === 0) {
    if (game.slapAtEndGame()) {
      game.winCentralPile(player)
      updateDisplayAfterTurn(`Good slap! Player${player} is back in the game!!`);
    } else {
      console.log('game over') //add function here that ends game
    }
  } else {
    if (game.slap()) {
      checkForJackSlapAtEnd(player); //check if jack slap and other play loses
      game.winCentralPile(player); //take middle cards and shuffle them into deck
      updateDisplayAfterTurn(`Good slap! Player${player} takes central pile!!`);
    } else {
      game.punishBadSlap(player); //bad slap (slapper loses top card of their hand and it goes to bottom of opponent's hand)
      updateDisplayAfterTurn(`Bad slap! Player${player} forfeits a card!!`);
    }
  }
}


function checkForJackSlapAtEnd(player) {
  if (player === 1 && game.centralPile[0].includes('jack') && getHandLength(2) === 0) {
    console.log('game over player One wins'); //add function here that ends game
    return
  } else if (player === 2 && game.centralPile[0].includes('jack') && getHandLength(1) === 0) {
    console.log('game over player Two wins') //add function here that ends game
    return
  }
}


function checkForDealKey(key, playerID) {
  // checkForEndScenario();//take out as could be issue?
  if (key === 81 && game.playerTurn === 1 && getHandLength(1) > 0) { //key q - playerOne deal if it's their turn
    game.moveCardToMiddle(); //move playerOne top card to middle
    game.playerTurn = 2; //change player turn
    giveWinningPlayerDeckBack(1); //give deck back to player if they are winning and out of cards
    refreshCardImages();
  } else if (key === 80 && game.playerTurn === 2 && getHandLength(2) > 0) { //key p - playerTwo deal - playerTwo deal if it's their turn
    game.moveCardToMiddle(); //move playerTwo top card to middle
    game.playerTurn = 1; //change player turn
    giveWinningPlayerDeckBack(2); //give deck back to player if they are winning and out of cards
    refreshCardImages()
  } else if (key === 81 || key === 80) {
    displayHeaderMessage(`Player${playerID} jumped the gun! It's not your turn!`)
  }
  checkForEndScenario()
}

function giveWinningPlayerDeckBack(player) { //give deck back to player if they are winning and out of cards
  if (getHandLength(1) !== 0 || getHandLength(2) !== 0) {
    return;
  }
  if (player === 1) {
    game.winCentralPile(1); //shuffle middle deck and give to player1 if player2 has no
  } else if (player === 2) {
    game.winCentralPile(2); //shuffle middle deck and give to player
  }

}

function checkForEndScenario() {
  if (getHandLength(1) === 0) {
    game.playerTurn = 2;
  } else if (getHandLength(2) === 0) {
    game.playerTurn = 1;
  }
}

function getHandLength(player) {
  if (player === 1) {
    return game.playerOne.hand.length
  } else if (player === 2) {
    return game.playerTwo.hand.length
  }
}

function loadGame() {
  game.resetGame(); //resets central pile and repopulates fullDeck
  refreshCardImages(); //update card images on DOM
  //update player wins from storage
}


//DOM manipulating functions
function updateDisplayAfterTurn(message) {
  refreshCardImages();
  displayHeaderMessage(message);
}


function refreshCardImages() {
  updatePlayerPileImage(1, playerOnePile);
  updatePlayerPileImage(2, playerTwoPile);
  if (game.centralPile.length === 0) {
    addClass(centralPile);
  } else {
    removeClass(centralPile);
    centralPile.src = `assets/${game.centralPile[0]}.png`
  }
}

function updatePlayerPileImage(player, element) {
  if (getHandLength(player) === 0) {
    addClass(element);
  } else {
    removeClass(element);
  }
}

function displayHeaderMessage(message) {
  removeClass(headerMessage);
  headerMessage.innerText = message;
  setTimeout(function() {
    addClass(headerMessage);
  }, 7000)
}

function addClass(element, className) {
  element.classList.add(className || "hidden");
}

function removeClass(element, className) {
  element.classList.remove(className || "hidden");
}
