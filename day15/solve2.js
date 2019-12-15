const {runIntCode} = require('../common/intCode');
const {createMap, getID} = require('./solve1');

const solve = input => {
    const visited = createMap(input);
    const  {grid, root} = createGrid(visited);
    return fillWithOxygen(grid, root);
};

const createGrid = visited => {
    const grid = [];
    const keys = Object.keys(visited);
    const minX = Math.min(...keys.map(v => parseInt(v.split(',')[0])));
    const maxX = Math.max(...keys.map(v => parseInt(v.split(',')[0])));
    const minY = Math.min(...keys.map(v => parseInt(v.split(',')[1])));
    const maxY = Math.max(...keys.map(v => parseInt(v.split(',')[1])));

    const root = {r: 0, c: 0};

    for (let c = 0; c < maxX - minX; c++) {
        for (let r = 0; r < maxY - minY; r++) {
            const key = getID(c + minX, r + minY);
            grid[r] = grid[r] ? grid[r] : [];
            grid[r][c] = visited[key] || 0;
            if (visited[key] === 2) {
                root.r = r;
                root.c = c;
            }
        }
    }
    return {grid, root}
};

const fillWithOxygen = (grid, root) => {
    let count = 0;
    grid[root.r][root.c] = 9;
    let neighborsToFill = [root];

    while (neighborsToFill.length) {
        const nextNeighbors = [];
        for (const cell of neighborsToFill) {
            const neighbors = [
                {c: cell.c + 1, r: cell.r},
                {c: cell.c - 1, r: cell.r},
                {c: cell.c, r: cell.r + 1},
                {c: cell.c, r: cell.r - 1}
            ];
            neighbors.filter(neighbor => grid[neighbor.r] && grid[neighbor.r][neighbor.c] === 1).forEach(neighbor => {
                nextNeighbors.push(neighbor);
                grid[neighbor.r][neighbor.c] = 9;
            });
        }
        neighborsToFill = nextNeighbors;
        count++;
    }
    return count - 1;
};

module.exports = {
    solve,
    result: 348
};
