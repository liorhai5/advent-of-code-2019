const {runIntCode} = require('../common/intCode');

const solve = input => {
    const expected = 19690720;
    let n, v = 0;
    loop: for (n = 0; n < 100; n++) {
        for (v = 0; v < 100; v++) {
            let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
            integers[1] = n;
            integers[2] = v;
            if (runIntCode({integers, index: 0, returnFirstInteger: true}, []) === expected) {
                break loop;
            }
        }
    }
    return 100 * n + v;
};

module.exports = {
    solve,
    result: 4967
};