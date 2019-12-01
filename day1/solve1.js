const solve = (input) => {
    let breakdown = input.map(x => parseInt(x.trim(), 10));
    let sum = 0;
    for (let i = 0; i < breakdown.length; i++) {
        sum += getFuelRequirement(breakdown[i]);
    }

    return sum;
};

const getFuelRequirement = mass => Math.floor(mass / 3) - 2;

module.exports = solve;