const fs = require('fs');

const solveUtils = (day, task) => {
    const solver = require(`./../day${day}/solve${task}`);
    const text = fs.readFileSync(`${__dirname}/../day${day}/input.txt`)
        .toString()
        .split('\n')
        .map(s => s.replace(/\r$/, ''))
        .filter(s => s.length > 0);

    const result = solver.solve(text);
    const check = solver.result === result;
    console.log(`DAY: ${day} | TASK: ${task}`);
    console.log('Result:');
    console.log(result);
    console.log('Check:', result === solver.result);
    console.log('----------------');
    return {result, check};
};

module.exports = {
    solve: solveUtils
};