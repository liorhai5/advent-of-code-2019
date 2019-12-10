const {getAsteroidsInSight, isAsteroid, getAngle, getID} = require('./solve1');

const solve = input => {
    const grid = input.map(x => x.split(''));

    let bestLocation = {r: 0, c: 0, count: 0};
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const count = getAsteroidsInSight(grid, r, c);
            if (count > bestLocation.count) {
                bestLocation = {r, c, count};
            }
        }
    }

    const angleMap = getAnglesMap(grid, bestLocation.r, bestLocation.c);
    const angles = Object.keys(angleMap).map(x => parseFloat(x)).sort((a, b) => a - b);
    let angleIndex = 0;
    let asteroid;
    for (let i = 0; i < 200; i++) {
        asteroid = angleMap[angles[angleIndex]].shift();
        angleIndex++;
        if (angleIndex >= angles.length) {
            angleIndex = 0;
        }
    }
    const asteroidPos = asteroid.split(',').map(x => parseInt(x, 10));
    return asteroidPos[1] * 100 + asteroidPos[0];
};

const getAnglesMap = (grid, r, c) => {
    const map = {};
    for (let _r = 0; _r < grid.length; _r++) {
        for (let _c = 0; _c < grid[_r].length; _c++) {
            if (r === _r && c === _c) {
                continue;
            }
            if (isAsteroid(grid, _r, _c)) {
                let a = getAngle(r, c, _r, _c) * (180 / Math.PI) + 90;
                if (a < 0) {
                    a += 360;
                }
                map[a] = map[a] || [];
                map[a].push(getID(_r, _c));
            }
        }
    }
    return map;
};


module.exports = {
    solve,
    result: 1119
};
