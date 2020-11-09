
// game init

const game = {
  title: 'Guess the Number!',
  biggestNum: 100,
  smallestNum: 1,
  secretNum: null,
  prevGuesses: [],
  play: function() {
    this.secretNum =Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100;
    let input = NaN;
    while(input !== this.secretNum) {
      input = this.testGuess();
      this.prevGuesses.push(input);
      this.render(input);
      if (input === this.secretNum) return;
    }
  },
  
  // Check Guess
  testGuess: function() {
    let input = NaN;
    while (isNaN(input) || input < this.smallestNum || input > this.biggestNum) {
      input = parseInt(prompt(`Guess the number between ${this.smallestNum} and ${this.biggestNum}: `));
    }
    return input;
  },

  //render input
  render: function(input) {
    let msg = (input === this.secretNum) ?
     `You got it Bucko! You guessed the number in ${this.prevGuesses.length} guesses!`
    :
      `
      Your guess is too ${input > this.secretNum ? 'high' : 'low'}
      Previous guesses: ${this.prevGuesses.join(', ')}
      `
    ;
    alert(msg);
  }
};

game.play();