const {step, createMoons, getPairs} = require('./solve1');

const solve = input => {
    const moons = createMoons(input);
    const pairs = getPairs(moons.length);
    const initX = getAxis(moons, 'x');
    const initY = getAxis(moons, 'y');
    const initZ = getAxis(moons, 'z');
    let cyclesX = 0;
    let cyclesY = 0;
    let cyclesZ = 0;

    let i = 0;
    while (cyclesX === 0 || cyclesY === 0 || cyclesZ === 0) {
        step(moons, pairs);
        i++;
        const currX = getAxis(moons, 'x');
        const currY = getAxis(moons, 'y');
        const currZ = getAxis(moons, 'z');
        if (cyclesX === 0 && initX === currX) {
            cyclesX = i;
        }
        if (cyclesY === 0 && initY === currY) {
            cyclesY = i;
        }
        if (cyclesZ === 0 && initZ === currZ) {
            cyclesZ = i;
        }
    }
    return lcmOfList([cyclesX, cyclesY, cyclesZ]);
};

const getAxis = (moons, axis) => moons.map(m => `${m[axis]},${m[`v${axis}`]}`).join(',');

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const lcm = (a, b) => a * b / gcd(a, b);
const lcmOfList = integers => integers.reduce(lcm);

module.exports = {
    solve,
    result: 332477126821644
};