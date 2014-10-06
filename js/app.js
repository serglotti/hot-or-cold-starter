
$(document).ready(function(){

	/* Variables */
	var guessCounter = 0;
	var targetNumber;
	var guessedNumber;
	var gameWon = false;
	var guessValidation;
	var isValid;
	var variance = 0;
	var direction = "";

  	// Starts a new game from scratch
  	newGame();
	$(".overlay").show();
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/* Main brain of the game. Performs analysis based on user input. */
  	$("form").on("submit", function(event) {
  		// Disables default behaviour of the submit button (does not submit form)
  		event.preventDefault();
  		// Sets user input to a variable
  		guessedNumber = $('#userGuess').val();
  		// Performs data validation on user input
  		isValid = guessValidation(guessedNumber);
  		// Loop does not run if game has already been won
  		if(gameWon) {
  			printFeedback("You already won this game.");
  		}
  		else {
  			// Runs if game has not been won and user input passes data validation
	  		if(isValid) {
	  			guessCounter++; // increments guess counter
		  		setGuessCount(); // updates counter element on page
		  		appendGuess(guessedNumber); // passes latest user input value to the guess list
		  		clearGuess(); // clears the input box and readies it for another entry
		  		hotOrCold(guessedNumber, targetNumber); // checks whether entry is hot, cold or correct
	  		}
	  		else {
	  			// do nothing
	  		}
  		}
  	});

  	// Resets game in the event the user wants to start over
  	$(".new").on("click", function(event) {
  		event.preventDefault();
  		newGame();  		
  	});

  	// Generates random number for game
	function randNum() {
		var randomNumber = Math.floor((Math.random()*100)+1);
		return randomNumber;
	}

  	/* This function increases the guess counter
  	time the user submits a guess  */
   	function setGuessCount() {
  		$("#count").text(guessCounter);
  	}

  	/* This function calls all functions to
  	reset the game to start anew  */
  	function newGame() {
  		guessCounter = 0; // sets counter to nil
  		targetNumber = randNum(); // assigns randomly generated number to a variable
  		console.log(targetNumber); // prints randon number to the console
  		clearGuess(); // deletes previous guesses in input box
  		userFocus(); // sets input box as the focus element on page
  		setGuessCount(); // resets guess count back to nil
  		$("ul#guessList li").remove(); // removes any previously entered guesses in the guess list
  		printFeedback("Make your Guess!"); // resets the feedback message
  		gameWon = false; // if game was previously won, this resets it back to false
  	};

  	/* This function clears any previously entered guesses  */
  	function clearGuess() {
  		$("#userGuess").val("");
  	}

	/* This function focuses the user back on the guess box*/
  	function userFocus() {
  		document.getElementById("userGuess").focus();
  	}

	/* This function validates the user's guess */
  	function guessValidation(guessedNumber) {
  		// If entry is not a number
  		if (isNaN(guessedNumber)) {
			printFeedback("Invalid entry. Please enter a number!");
			clearGuess();
			return false;
		} 
		// If number is not between 1 and 100
		else if (guessedNumber < 1 || guessedNumber > 100) {
			printFeedback("Invalid entry. Number must be between 1 and 100!");
			clearGuess();
			return false;
		}
		// If no number is entered
		else if (guessedNumber == "") {
			printFeedback("Please enter Your guess!");
			clearGuess();
			return false;
		}
		// Otherwise, entry is valid.
		else {
			return true;
		};	
  	}

  	/* Function to simplify updating the feedback element*/
	function printFeedback(feedback) {
		$('#feedback').text(feedback);
	}

	/* Function to append guesses to the guessList element*/
	function appendGuess(guessNum) {
		$("ul#guessList").append("<li>" + guessNum + "</li>");
	}

	/* Function calculates the difference between the guessedNumber and targetNumber, then evaluates
	   the magnitude of the variance between the two numbers. */
	function hotOrCold(guessedNumber, targetNumber) {
		variance = guessedNumber - targetNumber;

		// Determines if the user should guess higher or lower
		if (variance < 0) {
			direction = "higher";
		} else  if (variance > 0) {
			direction = "lower";
		}

		//Ends game if user guesses correctly
		if (Math.abs(variance) == 0) {
			printFeedback("Congrats! You guessed it!!");
			gameWon = true;
		} 
		/* This series of statements lets the user know how close they are and which
		   direction they should guess next */
		else if (Math.abs(variance) <= 5) {
			printFeedback("Your guess is very hot! Guess a " + direction + " number.");
		} 
		else if (Math.abs(variance) <= 10){
			printFeedback("Your guess is hot! Guess a " + direction + " number.");
		} 
		else if (Math.abs(variance)>=10 && Math.abs(variance) <= 20) {
			printFeedback("Your guess is warm! Guess a " + direction + " number.");
		} 
		else if (Math.abs(variance)>=20 && Math.abs(variance) <= 30) {
			printFeedback("Your guess is cool! Guess a " + direction + " number.");
		} 
		else if (Math.abs(variance)>=30 && Math.abs(variance) <= 40) {
			printFeedback("Your guess is cold! Guess a " + direction + " number.");
		} 
		else {
			printFeedback("Your guess is very cold! Guess a " + direction + " number.");
		}

	}

});


