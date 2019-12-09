const {runIntCode} = require('../common/intCode');

const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    integers[1] = 12;
    integers[2] = 2;
    return runIntCode({integers, index: 0, returnFirstInteger: true}, []);
};

module.exports = {
    solve,
    result: 5482655
};