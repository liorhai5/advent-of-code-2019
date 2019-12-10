const solve = input => {
    const grid = input.map(x => x.split(''));

    let mostInSight = 0;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            mostInSight = Math.max(mostInSight, getAsteroidsInSight(grid, r, c));
        }
    }
    return mostInSight;
};

const isAsteroid = (grid, r, c) => grid[r][c] === "#";

const getID = (r, c) => `${r},${c}`;

const getAngle = (r, c, _r, _c) => Math.atan2(_r - r, _c - c);

const getAsteroidsInSight = (grid, r, c) => {
    if (!isAsteroid(grid, r, c)) {
        return 0;
    }
    const map = {};
    let count = 0;
    for (let _r = 0; _r < grid.length; _r++) {
        for (let _c = 0; _c < grid[_r].length; _c++) {
            if (r === _r && c === _c) {
                continue;
            }
            if (isAsteroid(grid, _r, _c)) {
                const a = getAngle(r, c, _r, _c);
                if (!map[a]) {
                    map[a] = getID(_r, _c);
                    count++;
                }
            }
        }
    }
    return count;
};


module.exports = {
    solve,
    result: 334,
    getAsteroidsInSight,
    isAsteroid,
    getAngle,
    getID
};