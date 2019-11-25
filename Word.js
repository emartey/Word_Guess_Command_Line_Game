var Letter = require('./Letter.js');

function generateWord(word) {
    this.word = word;
    this.letters = [];

    this.makeLetters = function () {
        var wordArr = this.word.split("");
        for (var i = 0; i < wordArr.length; i++) {
            var newLetter = new Letter(wordArr[i]);
            this.letters.push(newLetter);
        }
    }

    this.makeGuess = function (guess) {
        this.letters.forEach(function (letter) {
            letter.checkLetters(guess);
        });
    }

    this.update = function () {
        var printedWord = "";
        this.letters.forEach(function (letter) {
            printedWord += letter.getCharacter() + " ";
        });
        return printedWord;
    }
}

module.exports = generateWord;