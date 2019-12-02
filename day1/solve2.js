const {getFuelRequirement} = require('./solve1');

const solve = input => {
    let modules = input.map(x => parseInt(x.trim(), 10));
    let sum = 0;
    for (let i = 0; i < modules.length; i++) {
        let fuelRequirement = getFuelRequirement(modules[i]);
        while (fuelRequirement > 0) {
            sum += fuelRequirement;
            fuelRequirement = getFuelRequirement(fuelRequirement);
        }
    }
    return sum;
};

module.exports = {
    solve
};

// RESULT: 5183030