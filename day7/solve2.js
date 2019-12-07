const {getPermutations} = require('./solve1');
const {getInstructionAndModes} = require('../day5/solve1');

const solve = input => {
    let maxThrust = 0;
    const sequences = getPermutations([5,6,7,8,9]);
    for (let i = 0; i < sequences.length; i++) {
        let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
        maxThrust = Math.max(maxThrust, solveForSequence(integers, sequences[i]))
    }
    return maxThrust;
};

const solveForSequence = (integers, sequence) => {
    let lastInput = -1;
    let output = 0;
    let configIndex = 0;
    const configs = [];
    for (let amp = 0; amp < 5; amp++) {
        configs.push({integers: integers.slice(), index: 0});
    }
    while (output !== -1) {
        const inputs = lastInput === -1 ? [sequence[configIndex], output] : [output];
        output = solveForIntegers(configs[configIndex], inputs);
        if (configIndex === 4) {
            lastInput = output;
        }
        configIndex = (configIndex + 1) % 5;
    }

    return lastInput;
};

const solveForIntegers = (config, inputs) => {
    let index = config.index;
    let integers = config.integers;
    let inputIndex = 0;

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
            integers[target] = inputs[inputIndex];
            if (inputIndex + 1 < inputs.length) {
                inputIndex++;
            }
            interval = 2;
        } else if (instruction == 4) { // output
            target = integers[index + 1];
            interval = 2;
            config.index = index + interval;
            return integers[target];
        } else if (instruction == 5) { // jump if true
            interval = 3;
            jumpTo = val1 != 0 ? val2 : -1;
        } else if (instruction == 6) { // jump if false
            interval = 3;
            jumpTo = val1 == 0 ? val2 : -1;
        } else if (instruction == 7) { // less than
            integers[target] = val1 < val2 ? 1 : 0;
        } else if (instruction == 8) { // equal
            integers[target] = val1 == val2 ? 1 : 0;
        } else if (integers[index] == 99) { // break
            index = integers.length;
        }

        if (jumpTo >= 0 ) {
            index = jumpTo;
        } else {
            index += interval;
        }
    }
    return -1;
};


module.exports = {
    solve
};

// RESULT: 21844737

