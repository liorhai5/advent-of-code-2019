const {getPermutations} = require('./solve1');
const {runIntCode} = require('../common/intCode');

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
        configs.push({integers: integers.slice(), index: 0, returnOnOutput: true});
    }
    while (output !== -1) {
        const inputs = lastInput === -1 ? [sequence[configIndex], output] : [output];
        output = runIntCode(configs[configIndex], inputs);
        if (configIndex === 4) {
            lastInput = output;
        }
        configIndex = (configIndex + 1) % 5;
    }

    return lastInput;
};

module.exports = {
    solve,
    result: 21844737
};
