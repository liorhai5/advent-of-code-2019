const {solveWithValidator} = require('./solve1');

const solve = input => {
    return solveWithValidator(input, hasMatchingAdjacentDigits)
};

const hasMatchingAdjacentDigits = digits => {
    let matches = [];
    let matchesIndex = 0;
    let hasTwoMatches = false;
    for (let i = 0; i < digits.length; i++) {
        matches[matchesIndex] = 0;
        while (i < digits.length && digits[i] === digits[i + 1]) {
            matches[matchesIndex] = matches[matchesIndex] + 1;
            i++;
        }
        if (matches[matchesIndex] > 0) {
            matchesIndex++;
        }
    }
    for (let i = 0; i < matches.length; i++) {
        if (matches[i] == 1) {
            hasTwoMatches = true;
        }
    }
    return hasTwoMatches;
};

module.exports = {
    solve,
    result: 750
};