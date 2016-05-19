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
    } else if (playersGuess === 0 || playersGuess > 100 || isNaN(playersGuess)) {
      $('#message').text("Please enter a number between 1-100.");
    } else {
      answerArray.push(playersGuess);
      numOfGuesses++;
      var guessesLeft = 5 - numOfGuesses;
      $('#guessesLeft').text("You have " + guessesLeft + " guesses left.");
      if (playersGuess == winningNumber) {
        $('#message').text("You won!");
        $('#message').addClass("big-message");
        $('#guessesLeft').css({"display": "none"});
        $('.winspin').addClass("go");
        $('.red').css({"color": "red"});
        $('.green').css({"color": "green"});
        $('.blue').css({"color": "blue"});
        $('.yellow').css({"color": "yellow"});
        $('.purple').css({"color": "purple"});
      } else {
        if (numOfGuesses < 5) {
          $('#message').text("Nope. Please try again! " + guessMessage());
        } else {
          $('#message').text("Sorry, you lose!");
          $('#message').addClass("big-message");
          $('.red').css({"display":"none"});
          $('#guessesLeft').css({"display":"none"});
          $('.welcome-div').append("<i class='glyphicon glyphicon-thumbs-down welcome-icon'></i>");
          setTimeout(function() {
            playAgain();
          }, 4000);
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
    numOfGuesses = 0;
    answerArray = [];
    winningNumber = generateWinningNumber();
    $('#message').text("New game started!");
    setTimeout(function() {
      $('#message').text("");
      $('#message').removeClass("big-message");
      $('#guessesLeft').css({"display": "inline-block"});
      $('#guessesLeft').text("You have 5 guesses.");
    }, 2000);
    $('.winspin').css({"color": "#333"});
    $('.red').css({"display":"inline-block"});
    $('.glyphicon-thumbs-down').remove();
    $('.winspin').removeClass("go");
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
