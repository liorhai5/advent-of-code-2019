const {parseData, getRequiredOres} = require('./solve1');

const MAX_ORE = 1000000000000;

const solve = input => {
    return binarySearch(input, 1, MAX_ORE);
};

const binarySearch = (input, start, end) => {
    if (start === end) {
        return start;
    } else if (start + 1 === end){
        const endOres = getRequiredOresByFuelAmount(input, end);
        return endOres <= MAX_ORE ? end : start;
    }
    const mid = Math.floor((start + end) / 2);
    const midOres = getRequiredOresByFuelAmount(input, mid);
    if (midOres === MAX_ORE) {
        return mid;
    } else if (midOres > MAX_ORE) {
        return binarySearch(input, start, mid);
    } else {
        return binarySearch(input, mid, end);
    }
};

const getRequiredOresByFuelAmount = (input, fuel) => getRequiredOres(parseData(input), 'FUEL', fuel);

module.exports = {
    solve,
    result: 12039407
};