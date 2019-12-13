const {runIntCode} = require('../common/intCode');

const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));

    const config = {integers, index: 0, returnOnOutput: true};
    const paintedMap = {[getID(0,0)]: 0};
    let panelX = 0;
    let panelY = 0;
    let dirX = 0;
    let dirY = -1;
    let output = 0;

    while (output !== -1) {
        const panelID = getID(panelX, panelY);
        const currentPaint = paintedMap[panelID] || 0;
        config.inputs = [currentPaint];
        output = runIntCode(config);
        paintedMap[panelID] = output;

        output = runIntCode(config);
        const newDirs = getDirection(output, dirX, dirY);
        dirX = newDirs.dirX;
        dirY = newDirs.dirY;
        panelX += dirX;
        panelY += dirY;
    }

    return Object.keys(paintedMap).length;
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
    result: 1771
};
