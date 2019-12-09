const {solve} = require('./common/solveUtils');

const args = process.argv.slice(2);
let days = Number(args[0]);
let allChecksPassed = true;

for (let i = 1; i <= days; i++) {
    const task1 = solve(i, 1);
    const task2 = solve(i, 2);
    if (allChecksPassed) {
        allChecksPassed = task1.check && task2.check;
    }
}

if (allChecksPassed) {
    console.log('ALL CHECKS PASS');
} else {
    console.log('HAS FAILING CHECKS');
}