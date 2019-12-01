const fs = require('fs');

const args = process.argv.slice(2);
let day = Number(args[0]);
let task = Number(args[1]);

const path = `./day${day}`;
const solver = require(`${path}/solve${task}`);
const text = fs.readFileSync(path + `/input.txt`)
    .toString()
    .split('\n')
    .map(s => s.replace(/\r$/, ''))
    .filter(s => s.length > 0);

console.log('Result:');
console.log(solver(text));