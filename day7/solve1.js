const {runIntCode} = require('../common/intCode');

const solve = input => {
    let maxThrust = 0;
    const sequences = getPermutations([0,1,2,3,4]);
    for (let i = 0; i < sequences.length; i++) {
        let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
        maxThrust = Math.max(maxThrust, solveForSequence(integers, sequences[i]))
    }
    return maxThrust;
};

const getPermutations = seq => {
    let permutations = [];
    for (let i = 0; i < seq.length; i++) {
        let rest = getPermutations(seq.slice(0, i).concat(seq.slice(i + 1)));
        if(!rest.length) {
            permutations.push([seq[i]])
        } else {
            for(let j = 0; j < rest.length; j++) {
                permutations.push([seq[i]].concat(rest[j]))
            }
        }
    }
    return permutations;
}

const solveForSequence = (integers, sequence) => {
    let lastInput = 0;
    for (let amp = 0; amp < 5; amp++) {
        lastInput = runIntCode({integers, index: 0, inputs: [sequence[amp], lastInput]});
    }
    return lastInput;
};

module.exports = {
    solve,
    result: 212460,
    getPermutations
};
