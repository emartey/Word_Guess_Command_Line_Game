function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;

    this.getCharacter = function () {
        if (!this.isGuessed) {
            return "_";
        } else {
            return this.letter;
        }
    }

    this.checkLetters = function (guess) {
        if (guess === this.letter) {
            this.isGuessed = true;
        }
    }
}

module.exports = Letter;