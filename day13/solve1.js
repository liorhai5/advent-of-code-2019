const {runIntCode} = require('../common/intCode');

const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    let output = 0;
    const config = {integers, index: 0, base: 0, returnOnOutput: true};

    let blockCount = 0;

    while (output !== -1) {
        output = runIntCode(config);
        output = runIntCode(config);
        output = runIntCode(config);
        blockCount += output === 2 ? 1 : 0;
    }

    return blockCount;
};


module.exports = {
    solve,
    result: 268
};