var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./word");
var words = require("./words");

function HangmanGame() {

    var self = this;

    this.play = function() {
        this.guessesLeft = 5;
        this.nextWord();
    };

    this.nextWord = function() {
        var randomWord = words[Math.floor(Math.random() * words.length)];
        this.currentWord = new Word(randomWord);
        console.log('\n' + this.currentWord + '\n');
        this.makeGuess();
    };

    this.makeGuess = function() {
        this.askLetter().then(function(){
            if (self.guessesLeft < 1) {
                console.log ( "Nohting left!!! The Word was: \"" + self.currentWord.getSolution() + "\"\n");
                self.askPlayAgain();
     
    } else if (self.currentWord.guessedCorrectly()) {
        console.log("YOU ARE AWESOME! NEXT ONE!");
        self.guessesLeft = 5;
        self.nextWord();
    } else {
        self.makeGuess();
    }

        });
    };

    this.askPlayAgain = function() {
        inquirer
        .prompt ([
            {
                type:"confirm",
                name:"choice",
                message:"Again?"
            }
        ]).then(function(val){
            if (val.choice) {
                self.play();
            }
        else {
            self.bye();
        }
        });
    };

    this.askLetter = function() {
        return inquirer
        .prompt([
            {
                type:"input",
                name:"choice",
                message:"Guess a letter",
                valite: function(val) {
                    return /[a-z1-9]/gi.test(val);
                }
            }
        ]).then(function(val) {
            var didGuessCorrect = self.currentWord.guessLetter(val.choice);
            if (didGuessCorrect) {
                console.log(chalk.green("\nCorrect!!!\n"));
            } 
            else {
                self.guessesLeft--;
                console.log(chalk.red("\nINCorrect!!!\n"));
                console.log(self.guessesleft + " guesses remaining!!! \n");
            }
        });
    };

    this.bye = function() {
        console.log("\n BYEEEEEEEEEE!!!");
        process.exit(0);
    };
}

module.exports = HangmanGame;