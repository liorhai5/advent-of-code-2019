const {solve}= require('./solveUtils');

const args = process.argv.slice(2);
let _day = Number(args[0]);
let _task = Number(args[1]);

solve(_day, _task);