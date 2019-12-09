const {runIntCode} = require('../intCode');

const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    return runIntCode({integers, index: 0}, [5])
};

module.exports = {
    solve,
    result: 236453
};
