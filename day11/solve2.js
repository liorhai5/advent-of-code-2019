const {runIntCode} = require('../common/intCode');

const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));

    const config = {integers, index: 0, base: 0, returnOnOutput: true};
    const paintedMap = {[getID(0,0)]: 1};
    let panelX = 0;
    let panelY = 0;
    let dirX = 0;
    let dirY = -1;
    let output = 0;

    while (output !== -1) {
        const panelID = getID(panelX, panelY);
        const currentPaint = paintedMap[panelID] || 0;
        output = runIntCode(config, [currentPaint]);
        paintedMap[panelID] = output;

        output = runIntCode(config, [currentPaint]);
        const newDirs = getDirection(output, dirX, dirY);
        dirX = newDirs.dirX;
        dirY = newDirs.dirY;
        panelX += dirX;
        panelY += dirY;
    }

    return print(paintedMap);
};

const print = map => {
    const mapKeys = Object.keys(map).map(key => key.split(',').map(x => parseInt(x, 10)));
    let minX = Math.min(...mapKeys.map(n => n[0]));
    let minY = Math.min(...mapKeys.map(n => n[1]));
    let maxX = Math.max(...mapKeys.map(n => n[0]));
    let maxY = Math.max(...mapKeys.map(n => n[1]));

    const grid = [];
    for (let i = 0; i < mapKeys.length; i++) {
        const id = getID(mapKeys[i][0], mapKeys[i][1]);
        const x = mapKeys[i][0] - minX;
        const y = mapKeys[i][1] - minY;
        if (grid[y] === undefined) {
            grid[y] = [];
        }
        grid[y][x] = map[id];
    }

    let str = '';
    for (let i = 0; i < maxY - minY + 1; i++) {
        for (let j = 0; j < maxX - minX + 1; j++) {
            str += grid[i][j] === 1 ? '#' : ' ';
        }
        str += '\n';
    }
    return str;
};

const getDirection = (dir, dirX, dirY) => {
    if (dir === 0) {
        if (dirX === 0) {
            dirX = dirY;
            dirY = 0;
        } else {
            dirY = -dirX;
            dirX = 0;
        }
    } else {
        if (dirX === 0) {
            dirX = -dirY;
            dirY = 0;
        } else {
            dirY = dirX;
            dirX = 0;
        }
    }
    return {dirX, dirY};
};

const getID = (x, y) => `${x},${y}`;


module.exports = {
    solve,
    result:
        ' #  #  ##  #### #  #   ## #  # #  # ####   \n' +
        ' #  # #  # #    #  #    # #  # #  #    #   \n' +
        ' #### #    ###  ####    # #### #  #   #    \n' +
        ' #  # # ## #    #  #    # #  # #  #  #     \n' +
        ' #  # #  # #    #  # #  # #  # #  # #      \n' +
        ' #  #  ### #### #  #  ##  #  #  ##  ####   \n'
};
