const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    return solveForIntegers(integers);
};

const solveForIntegers = integers => {
    const IN = 1;
    let index = 0;
    const outputs = [];

    while (index < integers.length) {
        const {instruction, modes} = getInstructionAndModes(integers[index] + "");

        let pos1 = integers[index + 1];
        let pos2 = integers[index + 2];
        let val1 = modes[modes.length - 1] === 1 ? pos1 : integers[pos1];
        let val2 = modes[modes.length - 2] === 1 ? pos2 : integers[pos2];
        let target = instruction < 3 ? integers[index + 3] : integers[index + 1];
        let interval = instruction < 3 ? 4 : 2;

        if (instruction == 1) { // add
            integers[target] = val1 + val2;
        } else if (instruction == 2) { // multiply
            integers[target] = val1 * val2;
        } else if (instruction == 3) { // input
            integers[target] = IN;
        } else if (instruction == 4) { // output
            outputs.push(integers[target])
        } else if (integers[index] == 99) { // break
            index = integers.length;
        }
        index += interval;
    }
    return outputs[outputs.length - 1];
};

const getInstructionAndModes = opt => {
    const instruction = parseInt(opt.slice(opt.length - 2), 10);
    const modes = opt.substring(0, opt.length - 2).split('').map(x => parseInt(x, 10));
    return {
        instruction,
        modes
    }
};

module.exports = {
    solve,
    getInstructionAndModes
};

// RESULT: 13547311