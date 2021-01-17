var game = new Game();

window.addEventListener('load', loadGame);



function loadGame() {
  game.resetGame(); //resets central pile and repopulates fullDeck
  //update player wins from storage
}

document.addEventListener('keydown', function(event) {
  checkKeyPress(event);
})

function checkKeyPress(event) {
  var key = event.keyCode;
  checkForSlapKey(key);
  checkForDealKey(key);
}

function checkForSlapKey(key) {
  if (key === 70 && game.playerOne.hand.length === 0) {//key f - playerOne slap
    if (game.slapAtEndGame()) {
      game.winCentralPile(1)
    } else {
      console.log('game over') //add function here that ends game
    }
  } else if (key === 70) {//key f - playerOne slap
    if (game.slap()) {
      game.winCentralPile(1); //take middle cards and shuffle them into deck
    } else {
      game.punishBadSlap(1); //bad slap (slapper loses top card of their hand and it goes to bottom of opponent's hand)
    }
  } else if (key === 74 && game.playerTwo.hand.length === 0) { //key j - playerTwo slap
    if (game.slapAtEndGame()) {
      game.winCentralPile(2)
    } else {
      console.log('game over') //add function here that ends game
    }
  } else if (key === 74) {//key j - playerTwo slap
    if (game.slap()) {
      game.winCentralPile(2); //take middle cards and shuffle them into deck
    } else {
      game.punishBadSlap(2); //bad slap (slapper loses top card of their hand and it goes to bottom of opponent's hand)
    }
  }
}

// function checkForEndScenario()
////check for end conditions ( both players have 0 and winning player slaps jack and gets full shuffled deck)
//other condition: if it's a good slap of jack and other player has 0 cards: game win
//other condition: bad slap by losing player is game win
//losing player can only slap jack
//pass in player
function checkForEndScenario() {
  if (game.playerOne.hand.length === 0) {
    game.playerTurn = 2;
  } else if (game.playerTwo.hand.length === 0) {
    game.playerTurn = 1;
  }
}


function checkForDealKey(key) {
  if (key === 81 && game.playerTurn === 1 && game.playerOne.hand.length !== 0) { //key q - playerOne deal if it's their turn
    game.moveCardToMiddle(); //move playerOne top card to middle
    game.playerTurn = 2; //change player turn
  } else if (key === 80 && game.playerTurn === 2 && game.playerTwo.hand.length !== 0) { //key p - playerTwo deal - playerTwo deal if it's their turn
    game.moveCardToMiddle(); //move playerTwo top card to middle
    game.playerTurn = 1; //change player turn
  } else {
    console.log('wrong key pressed') //invalid key (remove after testing)
  }
}
