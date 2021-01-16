var game = new Game();

window.addEventListener('load', loadGame);



function loadGame() {
  game.resetGame();//resets central pile and repopulates fullDeck
  //update player wins from storage
}

document.addEventListener('keydown', function() {
  checkKeyPress(event);
})

function checkKeyPress(event) {
  var key = event.keyCode;
  if(key === 70) {
    console.log('f')//key f - playerOne slap
  } else if(key === 74) {
    console.log('j')//key j - playerTwo slap
  } else if(key === 81) {
    console.log('q')//key q - playerOne deal
  } else if(key === 80) {
    console.log('p')//key p - playerTwo deal
  } else {
    console.log('wrong key pressed')//invalid key
  }
}
