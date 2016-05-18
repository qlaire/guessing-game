/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateWinningNumber(),
    numOfGuesses = 0,
    answerArray = [];




/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random() * 101);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = +$('#playersGuess').val();
  $('#playersGuess').val("");
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	if (playersGuess > winningNumber) {
	  return "higher";
	} else {
	  return "lower";
	}
}

// Create a message to help the user guess the right answer.

function guessMessage() {
  if (Math.abs(playersGuess - winningNumber) <= 5) {
    return "Your guess is " + lowerOrHigher() + " and within 5 digits of the Winning Number!";
  } else if (Math.abs(playersGuess - winningNumber) <= 10) {
    return "Your guess is " + lowerOrHigher() + " and within 10 digits of the Winning Number!";
  } else if (Math.abs(playersGuess - winningNumber) <= 20) {
    return "Your guess is " + lowerOrHigher() + " and within 20 digits of the Winning Number!";
  } else {
    return "Your guess is " + lowerOrHigher() + " and more than 20 digits away from the Winning Number!";
  }
}

// Check if the Player's Guess is the winning number

function checkGuess(){
  if (answerArray.includes(playersGuess)) {
    $('#message').text("You already guessed that number");
  } else {
    answerArray.push(playersGuess);
    numOfGuesses++;
    if (playersGuess == winningNumber) {
      $('#message').text("You won!");
    } else {
      $('#message').text("Nope. Please try again!");
    }
  }

}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */

$('#submitGuess').on('click', function() {
  playersGuessSubmission();
  checkGuess();
});
