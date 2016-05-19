(function () {
  /* **** Set up Variables **** */
  var playersGuess,
      winningNumber = generateWinningNumber(),
      numOfGuesses = 0,
      answerArray = [];

  /* **** Guessing Game Functions **** */

  // Generate the Winning Number

  function generateWinningNumber(){
  	return Math.floor(Math.random() * 100) + 1;
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
        if (numOfGuesses < 5) {
          $('#message').text("Nope. Please try again! " + guessMessage());
        } else {
          $('#message').text("Sorry, you exceeded 5 guesses. Let's start a new game!");
          setTimeout(function() {
            playAgain();
          }, 2000);
          }
        }
       }
  }

  // shuffle the array for providing the hint

  function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }

  // Create a provide hint button that provides additional clues to the "Player"

  function provideHint(){
  	var guessesRem = 5 - numOfGuesses;
    var hintArray = [];
    var numAns;
    if (guessesRem > 3) {
      numAns = 7;
    } else if (guessesRem > 2) {
      numAns = 5;
    } else if (guessesRem > 1) {
      numAns = 3;
    } else {
      numAns = 1;
    }
    for (var i = 0; i < numAns; i++) {
      hintArray.push(Math.floor(Math.random() * 100) + 1);
    }
    hintArray.push(winningNumber);
    $('#message').text("One of these values is the winning number: " + shuffleArray(hintArray).join(", ") + ". Submit a guess!");

  }

  // Allow the "Player" to Play Again

  function playAgain(){
    $('#message').text("New game started!");
    setTimeout(function() {
      $('#message').text("");
    }, 2000);
    numOfGuesses = 0;
    answerArray = [];
    winningNumber = generateWinningNumber();
  }


  /* **** Event Listeners/Handlers ****  */

  $('#submitGuess').on('click', function() {
    playersGuessSubmission();
    checkGuess();
  });

  $('#hint').on('click', provideHint);

  $('#playAgain').on('click', playAgain);

  $('#playersGuess').on('keypress', function(event) {
    if (event.which == 13) {
      playersGuessSubmission();
      checkGuess();
    }
  });

})();
