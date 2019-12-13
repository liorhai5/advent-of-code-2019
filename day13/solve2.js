const {runIntCode} = require('../common/intCode');

const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    integers[0] = 2;
    let lastOutput = 0;
    let score = 0;
    const config = {integers, index: 0, base: 0, inputIndex: 0, returnOnOutput: true, exitCode: null};

    let ballX = 0;
    let padX = 0;
    while (lastOutput != null) {
        config.inputs = [getInput(ballX, padX)];
        const x = runIntCode(config);
        const y = runIntCode(config);
        const type = runIntCode(config);
        if (x === -1 && y === 0) {
            score = type;
        } else {
            if (type === 4) {
                ballX = x;
            } else if (type === 3) {
                padX = x;
            }
        }
        lastOutput = type;
    }

    return score;
};

const getInput = (ballX, padX) => {
    if (ballX > padX) {
        return 1;
    } else if (ballX < padX) {
        return -1;
    }
    return 0;
};

module.exports = {
    solve,
    result: 13989
};