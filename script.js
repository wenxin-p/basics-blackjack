// DECK OF CARDS: Sub-function to generate a deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// CARD SHUFFLING: Sub-function to shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  var cardDeck = makeDeck();
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(cardDeck);
var cardDeck = makeDeck();

// Define variables to store Player and Computer's scores.
var playerCardScores = 0;
var computerCardScores = 0;
var playerScore = 0;

// Define variables to store P/C's cards and values.
var playerCards = [];
var computerCards = [];
var playerCardsValue = [];

//Define variables for different game modes.
var dealPlayerCards = "Deal cards for Player";
var hitACard = "Draw another card";
var endTurn = "End turn";

//Default game mode.
gameMode = dealPlayerCards;

//BUTTON SETTINGS: Create different buttons for the Player to click to play the game.
var button = document.getElementById("deal-button");
var hitButton = document.getElementById("hit-button");
var standButton = document.getElementById("stand-button");

//Only want the "Deal" button to be active at the start of the game.
hitButton.disabled = true;
standButton.disabled = true;

// Define a subfunction to calculate Player's score.
var countPlayerHandValue = function (playerCardsValue) {
  var playerCardScores = 0;
  var hasAce = false;
  for (let i = 0; i < playerCardsValue.length; i += 1) {
    playerCardScores = playerCardScores + Number(playerCardsValue[i]);
    //Check if user has an ace
    if (playerCardsValue[i] === 11) {
      hasAce = true;
    }
  }
  //If user has an ace and if the score doesn't exceed 21 if ace = 11 then it can have the value of 11.
  if (hasAce && playerCardsValue.length >= 3 && playerCardScores >= 21)
    playerCardScores = playerCardScores - 10;

  return playerCardScores;
};

// Default Mode: Drawing 2 cards for Player.
var main = function (input) {
  playerCardScores = 0;
  playerCards = [];
  if (gameMode == dealPlayerCards) {
    playerCardsValue = [];
    gameMode = hitACard;
    // Generate 2 cards for Player using for-loop.
    for (counter = 0; counter < 2; counter += 1) {
      var playerCard = shuffledDeck.pop();
      playerCards.push(playerCard.name + " of " + playerCard.suit);
      playerCardsValue.push(playerCard.value);
    }
    playerScore = countPlayerHandValue(playerCardsValue);

    myOutputValue =
      "Hi Player, you drew: " +
      playerCards +
      "<br><br>" +
      "Your current score is " +
      playerScore +
      ". <br><br>" +
      "Please choose the hit or stand button!";
  }

  //Special case when Player draws Blackjack from the start.
  if (playerScore == 21) {
    myOutputValue =
      "Hi Player, you drew: " +
      playerCards +
      "<br><br>" +
      "and your current score is " +
      playerScore +
      ". This means you just drew a BLACKJACK! <br><br>" +
      "Let's hit the stand button to see if the Computer is as lucky as you!";
  }

  // Allow Player to choose to end turn immediately if score is > 17.
  if (playerScore >= 17) {
    standButton.disabled = false;
  }
  button.disabled = true;
  hitButton.disabled = false;

  return myOutputValue;
};

// Function to allow user to draw cards.
var hitCard = function (input) {
  // If an Ace choice is pending, return and wait for input.
  gameMode = hitACard;
  standButton.disabled = false;
  var playerCard = shuffledDeck.pop();
  playerCards.push(playerCard.name + " of " + playerCard.suit);
  playerCardsValue.push(playerCard.value);
  playerScore = countPlayerHandValue(playerCardsValue);
  myOutputValue =
    "You drew " +
    playerCard.name +
    " of " +
    playerCard.suit +
    ". <br><br>" +
    "Your current hand is " +
    playerCards +
    "<br><br>" +
    "Your new score is " +
    playerScore +
    ". <br><br> Press 'Hit' if you wish to continue to draw more cards. Press 'Stand' if you wish to end your turn.";
  if (playerScore > 21) {
    myOutputValue =
      "You drew " +
      playerCard.name +
      " of " +
      playerCard.suit +
      ". <br><br>" +
      "Your current hand is " +
      playerCards +
      ". <br><br>" +
      "Your new score is " +
      playerScore +
      ". <br><br>" +
      "Oh no, you have BURST but hopefully the Computer will burst as well. Let's hit the Stand button to find out!";
  } else if (playerScore == 21) {
    myOutputValue =
      "You drew " +
      playerCard.name +
      " of " +
      playerCard.suit +
      ". <br><br>" +
      "Your current hand is " +
      playerCards +
      ". <br><br>" +
      "Your new score is " +
      playerScore +
      ". <br><br> Technically, you've won but let's see if the Computer has the same luck as you. Press 'Stand' to find out!";
  } else if (playerScore < 17) {
    standButton.disabled = true;
    myOutputValue =
      "You drew " +
      playerCard.name +
      " of " +
      playerCard.suit +
      ". <br><br>" +
      "Your current hand is " +
      playerCards +
      ". <br><br>" +
      "Your new score is " +
      playerScore +
      ". <br><br> You have to draw up till at least 17 points. Keep going!";
  }
  gameMode = hitACard;
  return myOutputValue;
};

// When Player decides to end turn and Computer's turn is triggered.
var standCard = function () {
  computerCardScores = 0;
  computerCards = [];
  // Generate 2 cards for Computer using for-loop.
  for (counter = 0; counter < 2; counter = counter + 1) {
    var computerCard = shuffledDeck.pop();
    computerCardScores = computerCardScores + computerCard.value;
    computerCards.push(computerCard.name + " of " + computerCard.suit);
  }
  // Automatically drawing cards for the computer if score is <17.
  while (computerCardScores < 17) {
    computerCard = shuffledDeck.pop();
    computerCardScores = computerCardScores + computerCard.value;
    computerCards.push(computerCard.name + " of " + computerCard.suit);
  }
  // Compare different outcomes to determine who wins.
  // Outcome 1: Both Computer and Player burst.
  if (computerCardScores > 21 && playerScore > 21) {
    finalOutcome =
      "The computer drew " +
      computerCards +
      "and got a score of " +
      computerCardScores +
      "." +
      "<br><br>" +
      "Good for you, looks like the Computer BURST as well. Let's just call it a tie!";
    button.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
    // Outcome 2: Computer didn't burst but Player did.
  } else if (computerCardScores < 21 && playerScore > 21) {
    finalOutcome =
      "The computer drew " +
      computerCards +
      " and got a score of " +
      computerCardScores +
      "." +
      "<br><br>" +
      "Oh boy, looks like  the Computer has won. Better luck next time! ";
    button.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;

    //Outcome 3: Both didn't burst but Computer has a higher score.
  } else if (
    computerCardScores < 21 &&
    playerScore < 21 &&
    computerCardScores > playerScore
  ) {
    finalOutcome =
      "The computer drew " +
      computerCards +
      "and got a score of " +
      computerCardScores +
      "." +
      "<br><br>" +
      "Oh boy, looks like the Computer has won with a score close to 21. Better luck next time! ";
    button.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
  }
  // Outcome 4: Both didn't burst but Player has a higher score.
  else if (
    computerCardScores < 21 &&
    playerScore < 21 &&
    computerCardScores < playerScore
  ) {
    finalOutcome =
      "The computer drew " +
      computerCards +
      "and got a score of " +
      computerCardScores +
      "." +
      "<br><br>" +
      "Wow congratulations! Looks like you have won with a score close to 21! ";
    button.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
  }
  // Outcome 5: Both Computer and Player had the same scores.
  else if (
    computerCardScores < 21 &&
    playerScore < 21 &&
    computerCardScores == playerScore
  ) {
    finalOutcome =
      "The computer drew " +
      computerCards +
      "and got a score of " +
      computerCardScores +
      ".<br><br>" +
      "Wow, what a coincidence, Computer drew the same score as you. Guess it's a tie!";
    button.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
  }
  // Outcome 6: Both Computer and Player drew 21 points.
  else if (computerCardScores == 21 && playerScore == 21) {
    finalOutcome =
      "The computer drew " +
      computerCards +
      "and got a score of " +
      computerCardScores +
      ".<br><br>" +
      "Wow, it's a BLACKJACK for the Computer too. Let's just call it a tie!";
    button.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
  }
  // Outcome 7: Computer lost and Player drew 21 points.
  else if (computerCardScores < 21 && playerScore == 21) {
    finalOutcome =
      "The computer drew " +
      computerCards +
      "and got a score of " +
      computerCardScores +
      ".<br><br>" +
      "Congratulations, winning with a BLACKJACK is the ultimate glory!";
    button.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
  }
  // Outcome 8: Player lost and Computer drew 21 points.
  else if (playerScore < 21 && computerCardScores == 21) {
    finalOutcome =
      "The computer drew " +
      computerCards +
      "and got a score of " +
      computerCardScores +
      ".<br><br>" +
      "Oh wells! Not only did the Computer win, it had a BLACKJACK win. Better luck next time!";
    button.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
  }
  gameMode = dealPlayerCards;
  return (myOutputValue = finalOutcome);
};
