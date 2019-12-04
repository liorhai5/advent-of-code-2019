const solve = input => {
    return solveWithValidator(input, hasMatchingAdjacentDigits);
};

const solveWithValidator = (input, matchValidator) => {
    const range = input[0].split('-');
    const min = parseInt(range[0].trim(), 10);
    const max = parseInt(range[1].trim(), 10);

    let current = min;
    let count = 0;

    while (current <= max) {
        const digits = current.toString().split('').map(x => parseInt(x.trim(), 10));
        const matchingAdjacentDigits = matchValidator(digits);
        const onlyIncreasingDigits = isOnlyIncreasingDigits(digits);
        count += matchingAdjacentDigits && onlyIncreasingDigits ? 1 : 0;
        current++;
    }
    return count;
};

const hasMatchingAdjacentDigits = digits => {
    let hasMatch = false;
    for (let i = 1; i < digits.length; i++) {
        if (digits[i] === digits[i - 1]) {
            hasMatch = true;
        }
    }
    return hasMatch;
};

const isOnlyIncreasingDigits = digits => {
    let isIncreasing = true;
    for (let i = 1; i < digits.length; i++) {
        if (digits[i] < digits[i - 1]) {
            isIncreasing = false;
        }
    }
    return isIncreasing;
};

module.exports = {
    solve,
    solveWithValidator
};

// RESULT: 1154