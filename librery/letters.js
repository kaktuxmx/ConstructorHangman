function Letters(char) {
    this.visible = !/[a-z1-9]/i.test(char);
    this.char = char;
}

Letters.prototype.toString = function() {
    if (this.visible === true) {
        return this.char;
    }
    return "_";
};

Letters.prototype.getSolution = function() {
    return this.char;
};

Letters.prototype.guess = function(charGuess) {
    if (charGuess.toUpperCase() === this.char.toUpperCase()) {
        this.visible = true;
        return true;
    }
    return false;
};

module.exports = Letters;