const solve = input => {
    let modules = input.map(x => parseInt(x.trim(), 10));
    let sum = 0;
    for (let i = 0; i < modules.length; i++) {
        sum += getFuelRequirement(modules[i]);
    }

    return sum;
};

const getFuelRequirement = mass => Math.floor(mass / 3) - 2;

module.exports = {
    solve,
    result: 3457281,
    getFuelRequirement
};