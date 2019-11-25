var Word = require("./Word.js");
var inquirer = require("inquirer");

var wordBank = [
    "cowboys", "texans", "astros",
    "rangers", "stars", "wings",
    "mavericks", "spurs", "longhorns",
    "aggies", "bears", "rockets"
];

var wordChoice;
var guesses;
var pickedWord;
var word;

function init() {
    wordChoice = [];
    console.log("\n");
    console.log("Welcome to Teams in Texas!");
    console.log("-------------------------");
    console.log("\n");
    console.log("Try to guess which sports team from the great state of Texas is listed. Let's go!");
    console.log("\n");
    playGame();
}

function init2() {
    wordChoice = [];
    console.log("\n");
    console.log("------------------------------------------");
    console.log("\n");
    console.log("Let's go!");
    console.log("\n");
    playGame();
}

function playGame() {
    pickedWord = "";
    guesses = 15;
    if (wordChoice.length < wordBank.length) {
        pickedWord = getWord();
    } else {
        playAgain();
    }
    if (pickedWord) {
        word = new Word(pickedWord.toUpperCase());
        word.makeLetters();
        makeGuess();
    }
}

function getWord() {
    var rand = Math.floor(Math.random() * wordBank.length);
    var randomWord = wordBank[rand];
    if (wordChoice.indexOf(randomWord) === -1) {
        wordChoice.push(randomWord);
        return randomWord;
    } else {
        return getWord();
    }
}

function makeGuess() {
    var checker = [];
    inquirer.prompt([
        {
            name: "guessedLetter",
            message:
                word.update() +
                "\n" +
                "\nGuess a letter!" +
                "\n" +
                "\nGuesses Left: " + guesses +
                "\n"
        }
    ])
        .then(function (data) {
            word.letters.forEach(letter => {
                letter.checkLetters(data.guessedLetter.toUpperCase());
                checker.push(letter.getCharacter());
            });
            if (guesses > 0 && checker.indexOf("_") !== -1) {
                guesses--;
                if (guesses === 0) {
                    console.log("\n");
                    console.log("YOU RAN OUT OF GUESSES! GAME OVER.");
                    console.log("\n");
                    playAgain();
                } else {
                    makeGuess();
                }
            } else {
                console.log("\n");
                console.log("CONGRATULATIONS, YOU GOT IT! GO " + pickedWord.toUpperCase() + "!");
                console.log("\n");
                if (playAgain()) {
                    console.log(word.update());
                }

            }
        });
}

function playAgain() {
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "Would you like to play again?",
            choices: ["Yes", "No"]
        }
    ])
        .then(function (data) {
            if (data.continue === "Yes") {
                init2();
            } else {
                console.log("Thanks for playing!");
            }
        });
}

init();