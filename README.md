# **SlapJack**

SlapJack is the Mod1 final project in the [Turing School of Software and Design](https://turing.io/).

This card game uses a standard deck of cards, and the point of the game is to still have cards in your hand when your opponent runs out. At the beginning of the game, a full deck is dealt evenly between two players. The players then alternate turns dealing a card to the middle pile face-up. If at any time a slap scenario is presented in the middle pile (jack on top, two matching cards placed consecutively, or matching cards on top and position 3), a player can 'slap' and will have the contents of the middle pile shuffled into their deck. If the player slaps and there is no slap scenario present, the slapping player loses their top card, and it is added to the bottom of their opponent's deck. If one player runs out of cards, the only valid slap scenario for both players is if a jack is on top of the middle pile. Should the player without cards slap a non-jack, or their opponent slaps a valid jack first, the player without cards loses! If the player without cards slaps a valid jack, they receive the middle pile and the standard games rules go back into effect.

[Original Project Specifications and Game Rules](https://frontend.turing.io/projects/module-1/slapjack.html)




## Contributors
##### Jeff Shepherd: [GitHub](https://github.com/JeffShepherd)

## Setup
###### *Fork this repository and run the following in your terminal*
```
$ git clone git@github.com:JeffShepherd/SlapJack.git
```


![Winner winner chicken dinner](./assets/readme-images/winner.png)


## Learning Goals
  - Solidify and demonstrate your understanding of:
    - DRY JavaScript
    - localStorage to persist data
    - event delegation to handle similar event listeners
  - Understand the difference between the data model and how the data is displayed on the DOM
  - Use your problem solving process to break down large problems, solve things step by step, and trust yourself to not rely on an outside “answer” to a logical    challenge


## Code Architecture
  - index.html: Fewest elements possible used, with as many being semantic as possible.
  - styles.css: Organized by section, and includes classes used across multiple elements for styling.
  - player.js (data only):
    - Constructor properties include id, wins, and hand. Wins update automatically on page load if there is anything saved to localStorage for that player.
    - Methods allow a Player to play(remove) a card from their hand, save wins to storange, and get saved wins from localStorage.
  - game.js (data only):
    - Constructor properties include two unique instances of Player, player turn, central pile, and a full deck to be used upon game load or refresh.
    - Methods allow for: shuffling deck, winning the central pile, dealing the deck in the beginning of the game, moving a specific player's card to the middle pile, punishing a bad slap, checking for a good slap (as well as individual methods for each type of slap), checking for a good slap during the end game scenario, and resetting the game.
  - main.js
    - This file includes the global variable, event listeners, and functions that are invoked by specific events.
    - All functionality updates the data model first, and then updates the DOM.


## Reflections
#### Wins
  - Incorporating a method into the constructor method that assigns any saved wins from localStorage to the current win display.
  - Figuring out how to use animation on a PNG, and ensure it doesn't block out any important messages by using the z-index for the first time.
  - After honing workflow skills on other projects, I have seen some great improvements in professionalism. Using a more robust design process up front was extremely helpful with my code architecture. Also, committing more often proved helpful when issues arose.

#### Challenges
  - I lost a lot of time (estimated half or full day) trying to solve for logic that wasn't correct. Whether it was my misinterpretation, or ambiguity of the instructions, I was writing code to solve for incorrect logic. In future projects, I will be sure to spend more time up front scrutinizing small project details.
  - I am relatively inexperienced with animation, so it took a lot of time to have the UFO glide accross the header. Ultimately, I am happy I spent the time doing this, as I learned a lot about animation.
  - A distracting family issue arose on the last day, and took time that I would have likely used for additional features.

#### Other Reflections
  - This project proved to me, even further, that spending time in the beginning designing how your app will be coded is crucial to the success of the project.
  - The use of code comments on every line of functions is really helpful when debugging. I was easily able to understand what that line is doing, and if I needed to consider it during the debugging process.
  - I was unable to use an established naming convention for my classes due to time constraints, but learned a lot about why these are important in larger applications during a code review with my mentor.



## Programming Languages
 <img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/><img src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/><img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>

