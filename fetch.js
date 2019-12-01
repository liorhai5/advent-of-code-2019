const https = require('https');
const fs = require('fs');

const args = process.argv.slice(2);
const year = '2019';
let day = Number(args[0]);

console.log('NEED TO LOG IN...')
return;


const remotePath = `https://adventofcode.com/${year}/day/${day}/input`;
const localPath = `./day${day}/input.txt`;
const file = fs.createWriteStream(localPath);
const request = https.get(remotePath, (response) => {
    response.pipe(file);
    file.on('finish', function() {
        console.log('Finished');
    });
});