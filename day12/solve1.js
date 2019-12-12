const solve = input => {
    const moons = createMoons(input);
    const pairs = getPairs(moons.length);

    for (let i = 0; i < 1000; i++) {
        step(moons, pairs);
    }

    return calcEnergyTotal(moons);
};

const createMoons = input => {
    let positions = input.map(moon => moon.replace(/[<>xyz=]/g, '').split(',').map(x => parseInt(x.trim(), 10)));
    const moons = [];
    for (let i = 0; i < positions.length; i++) {
        moons.push({x: positions[i][0], y: positions[i][1], z: positions[i][2], vx: 0, vy: 0, vz: 0});
    }
    return moons;
};

const step = (moons, pairs) => {
    applyGravity(moons, pairs);
    applyVelocity(moons);
};

const calcEnergyTotal = moons => {
    let energySum = 0;
    for (let m = 0; m < moons.length; m++) {
        energySum += calcMoonEnergy(moons[m]);
    }
    return energySum;
};

const calcMoonEnergy = moon => {
    const pot = abs(moon.x) + abs(moon.y) + abs(moon.z);
    const kin = abs(moon.vx) + abs(moon.vy) + abs(moon.vz);
    return kin * pot;
};

const applyVelocity = moons => {
    for (let m = 0; m < moons.length; m++) {
        applyMoonVelocity(moons[m]);
    }
};

const applyGravity = (moons, pairs) => {
    for (let p = 0; p < pairs.length; p++) {
        const moon1 = moons[pairs[p][0]];
        const moon2 = moons[pairs[p][1]];
        applyPairGravity(moon1, moon2, 'x');
        applyPairGravity(moon1, moon2, 'y');
        applyPairGravity(moon1, moon2, 'z');
    }
};

const applyPairGravity = (moon1, moon2, axis) => {
    if (moon1[axis] > moon2[axis]) {
        moon1[`v${axis}`] -= 1;
        moon2[`v${axis}`] += 1;
    } else if (moon1[axis] < moon2[axis]) {
        moon1[`v${axis}`] += 1;
        moon2[`v${axis}`] -= 1;
    }
};

const applyMoonVelocity = moon => {
    moon.x += moon.vx;
    moon.y += moon.vy;
    moon.z += moon.vz;
};

const abs = x => Math.abs(x);

const getPairs = length => {
    const map = {};
    const id = (i1, i2) => `${i1},${i2}`;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (i !== j && map[id(i,j)] === undefined && map[id(j,i)] === undefined) {
                map[id(i,j)] = [i, j];
            }
        }
    }
    return Object.values(map);
};



module.exports = {
    solve,
    result: 8625,
    step,
    createMoons,
    getPairs,
    calcMoonEnergy
};