const {runIntCode} = require('../common/intCode');

const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    return runIntCode({integers, index: 0, inputs: [1]});
};

module.exports = {
    solve,
    result: 4006117640
};
