const solve = input => {
    let grid = input.map(row => row.split(''));
    print(grid);

    const initialPos = findPosOfChar(grid, '@');
    grid[initialPos.r][initialPos.c] = '.';
    return BFS(grid, initialPos, {}, getNumKeys(grid));
};

const BFS = (grid, pos, keys, numKeys) => {
    console.log(pos, keys)
    const visitedPositions = {};
    const queue = [pos];
    let pathSize = 0;
    let pathSizeCur = Infinity;
    let pathSizeRec = Infinity;

    while (queue.length) {
        pos = queue.pop();
        if (!pos || pos.r < 0 || pos.c < 0 || pos.r > grid.length - 1 || pos.c > grid[pos.r].length - 1 || visitedPositions[getID(pos)]) {
            continue;
        }

        pathSize++;

        let cell = grid[pos.r][pos.c];
        if (isBlocked(cell, keys)) {
            continue;
        }

        if (isKey(cell) && !keys[cell]) {
            keys[cell] = true;
            if (Object.keys(keys).length === numKeys) {
                pathSizeCur = pathSize;
            }
            let nextSize = BFS(grid, pos, keys, numKeys);
            if (nextSize !== Infinity) {
                pathSizeRec = Math.min(pathSizeRec, pathSize + nextSize);
            }
        }

        visitedPositions[getID(pos)] = true;
        queue.push({r: pos.r + 1, c: pos.c});
        queue.push({r: pos.r - 1, c: pos.c});
        queue.push({r: pos.r, c: pos.c + 1});
        queue.push({r: pos.r, c: pos.c - 1});
    }

    return Math.min(pathSizeCur, pathSizeRec);
};

const getNumKeys = grid => {
    let count = 0;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (isKey(grid[r][c])) {
                count++;
            }
        }
    }
    return count;
};

const findPosOfChar = (grid, char) => {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === char) {
                return {r, c};
            }
        }
    }
    return null;
};

const getID = pos => `${pos.r},${pos.c}`;
const isKey = char => char !== '.' && char !== '#' && char === char.toLowerCase();
const isDoor = char => char !== '.' && char !== '#' && char !== char.toLowerCase();
const isBlocked = (cell, keys) => {
    if (cell === '#') {
        return true;
    }
    if (cell === '.') {
        return false;
    }
    if (isKey(cell)) {
        return false;
    }
    if (isDoor(cell) && keys[cell.toLowerCase()]) {
        return false;
    }
    return true;
}

const print = grid => {
    let str = '';
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            str += grid[r][c];
        }
        if (r !== grid.length - 1) {
            str += '\n';
        }
    }
    console.log(str);
};

module.exports = {
    solve,
    result: 0
};