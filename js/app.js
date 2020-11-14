/*------Constants------*/
const kazoo = new Audio("audio/kazoo.wav");
/*------Variables------*/
let secretNum, guessList, isWinner;
/*------Cached Element References------*/
const messageEl = document.getElementById("message");
const guessesEl = document.getElementById("prevGuess");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const guessInput = document.getElementById("guessInput");
/*------Event Listeners------*/
resetBtn.addEventListener("click", function () {
  init();
});

guessBtn.addEventListener("click", function () {
  if (guessList.length === 0) {
    guessesEl.innerText = "Previous Guesses:";
  }
  if (isWinner === false) {
    checkGuess(parseInt(guessInput.value));
  }
});

/*------Functions------*/

init();
function checkGuess(guess) {
  guessInput.value = "";
  if (guess < 1 || guess > 100 || isNaN(guess)) {
    messageEl.innerText = "Whoops! Please try a number between 1 and 100!";
  } else if (guess === secretNum) {
    isWinner = true;
    confetti.start(1500);
    setTimeout(function () {
      kazoo.play();
    }, 1000);
    messageEl.className = "winner";
    if (guessList.length === 0) {
      messageEl.innerText = `Congratulations!  You found the number in ${
        guessList.length + 1
      } guess!`;
    } else {
      messageEl.innerText = `Congratulations!  You found the number in ${
        guessList.length + 1
      } guesses!`;
    }
  } else if (guess < secretNum) {
    messageEl.className = "low";
    messageEl.innerText = `${guess} is TOO LOW , please try again!`;
    guessList.push(guess);
  } else {
    messageEl.className = "high";
    messageEl.innerText = `${guess} is TOO HIGH , please try again!`;
    guessList.push(guess);
  }
  render(guess);
}
function render(guess) {
  if (guess > secretNum) {
    let div = document.createElement("div");
    div.innerText = guess;
    div.className = "high";
    guessesEl.appendChild(div);
  } else if (guess < secretNum) {
    let div = document.createElement("div");
    div.innerText = guess;
    div.className = "low";
    guessesEl.appendChild(div);
  }
}

function init() {
  messageEl.className = "";
  guessesEl.innerText = "";
  messageEl.innerText = "Please enter a guess between 1 and 100!";
  guessInput.value = "";
  guessList = [];
  isWinner = false;
  secretNum = Math.floor(Math.random() * 100) + 1;
}
