const {runIntCode} = require('../common/intCode');

const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    const output = runIntCode({integers, returnAllOutputs: true});
    const grid = createGrid(output);
    return calculateAlignmentSum(grid);
};

const calculateAlignmentSum = grid => {
    let alignmentSum = 0;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (isIntersection(grid, r, c)) {
                alignmentSum += r * c;
                grid[r][c] = 'O';
            }
        }
    }
    return alignmentSum;
};

const isIntersection = (grid, r, c) =>
    grid[r][c + 1] === '#' &&
    grid[r][c - 1] === '#' &&
    r + 1 < grid.length &&
    grid[r + 1][c] === '#' &&
    r - 1 >= 0 &&
    grid[r - 1][c] === '#';

const createGrid = output => {
    const grid = [[]];
    let gridR = 0;
    let gridC = 0;
    for (const code of output) {
        if (code !== 10) {
            grid[gridR][gridC] = String.fromCharCode(code);
            gridC++;
        } else {
            gridR++;
            gridC = 0;
            grid[gridR] = [];
        }
    }
    return grid;
};

module.exports = {
    solve,
    result: 5740,
    createGrid
};
