const {getInstructionAndModes} = require('./solve1');

const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    return solveForIntegers(integers);
};

const solveForIntegers = integers => {
    const IN = 5;
    let index = 0;
    const outputs = [];

    while (index < integers.length) {
        const {instruction, modes} = getInstructionAndModes(integers[index] + "");

        let pos1 = integers[index + 1];
        let pos2 = integers[index + 2];
        let val1 = modes[modes.length - 1] === 1 ? pos1 : integers[pos1];
        let val2 = modes[modes.length - 2] === 1 ? pos2 : integers[pos2];

        let target = integers[index + 3];
        let interval = 4;
        let jumpTo = -1;

        if (instruction == 1) { // add
            integers[target] = val1 + val2;
        } else if (instruction == 2) { // multiply
            integers[target] = val1 * val2;
        } else if (instruction == 3) { // input
            target = integers[index + 1];
            integers[target] = IN;
            interval = 2;
        } else if (instruction == 4) { // output
            target = integers[index + 1];
            outputs.push(integers[target]);
            interval = 2;
        } else if (instruction == 5) { // jump if true
            interval = 3;
            if (val1 != 0) {
                jumpTo = val2;
            }
        } else if (instruction == 6) { // jump if false
            interval = 3;
            if (val1 == 0) {
                jumpTo = val2;
            }
        } else if (instruction == 7) { // less than
            integers[target] = val1 < val2 ? 1 : 0;
        } else if (instruction == 8) { // equal
            integers[target] = val1 == val2 ? 1 : 0;
        } else if (integers[index] == 99) { // break
            index = integers.length;
        }
        if (jumpTo >=0 ) {
            index = jumpTo;
        } else {
            index += interval;
        }
    }
    return outputs[outputs.length - 1];
};

module.exports = {
    solve
};

// RESULT: 236453

