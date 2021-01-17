var game = new Game();

////check for end conditions:
//condition: solved: if it's a good slap of jack and other player has 0 cards: game win
//condition: solved: bad slap by losing player is game win
//condition: solved: losing player can only slap jack
//condition: solved: if one player has zero cards, and the other runs out, winner gets central pile



window.addEventListener('load', loadGame);
document.addEventListener('keydown', function(event) {
  checkKeyPress(event);
})

function checkKeyPress(event) {
  var key = event.keyCode;
  var player;

  if(key === 70) {
    player = 1;
    checkForSlapKey(player);
  } else if(key === 74) {
    player = 2;
    checkForSlapKey(player);
  }

  checkForDealKey(key);
}


function checkForSlapKey(player) {
  if (getHandLength(player) === 0) {//key f - playerOne slap
    if (game.slapAtEndGame()) {
      game.winCentralPile(player)
    } else {
      console.log('game over') //add function here that ends game
    }
  } else {//key f - playerOne slap
    if (game.slap()) {
      game.winCentralPile(player); //take middle cards and shuffle them into deck
      checkForJackSlapAtEnd(player);//check if jack slap and other play loses
    } else {
      game.punishBadSlap(player); //bad slap (slapper loses top card of their hand and it goes to bottom of opponent's hand)
    }
  }
}


function checkForJackSlapAtEnd(player) {
   if (player === 1 && game.centralPile[0].includes('jack') && getHandLength(2) === 0) {
     console.log('game over player One wins'); //add function here that ends game
   } else if (player === 2 && game.centralPile[0].includes('jack') && getHandLength(1) === 0) {
     console.log('game over player Two wins')//add function here that ends game
   }
}


function checkForDealKey(key) {
  // checkForEndScenario();//take out as could be issue?
  if (key === 81 && game.playerTurn === 1 && getHandLength(1) > 0) { //key q - playerOne deal if it's their turn
    game.moveCardToMiddle(); //move playerOne top card to middle
    game.playerTurn = 2; //change player turn
    giveWinningPlayerDeckBack(1);//give deck back to player if they are winning and out of cards
  } else if (key === 80 && game.playerTurn === 2 && getHandLength(2) > 0) { //key p - playerTwo deal - playerTwo deal if it's their turn
    game.moveCardToMiddle(); //move playerTwo top card to middle
    game.playerTurn = 1; //change player turn
    giveWinningPlayerDeckBack(2);//give deck back to player if they are winning and out of cards
  } else if(key === 81 || key === 80){
    console.log('it is not your turn') //invalid key (remove after testing)
  }
  checkForEndScenario()
}

function giveWinningPlayerDeckBack(player) {//give deck back to player if they are winning and out of cards
  if(getHandLength(1) !== 0 || getHandLength(2) !== 0) {
    return;
  }

  if(player === 1) {
    winCentralPile(1);//shuffle middle deck and give to player1 if player2 has no
  } else if(player === 2) {
    winCentralPile(2);//shuffle middle deck and give to player
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
  if(player === 1) {
    return game.playerOne.hand.length
  } else if(player === 2) {
    return game.playerTwo.hand.length
  }
}

function loadGame() {
  game.resetGame(); //resets central pile and repopulates fullDeck
  //update player wins from storage
}
