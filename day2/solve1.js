const solve = (input) => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    integers[1] = 12;
    integers[2] = 2;
    return solveForIntegers(integers);
};

const solveForIntegers = (integers) => {
    let index = 0;
    while (index < integers.length) {
        let pos1 = integers[index + 1];
        let pos2 = integers[index + 2];
        let target = integers[index + 3];
        if (integers[index] == 1) { // add
            integers[target] = integers[pos1] + integers[pos2];
        } else if (integers[index] == 2) { // multiply
            integers[target] = integers[pos1] * integers[pos2];
        } else if (integers[index] == 99) { //break
            index = integers.length;
        }
        index += 4;
    }
    return integers[0];
};

module.exports = {
    solve,
    solveForIntegers
};

// RESULT: 5482655