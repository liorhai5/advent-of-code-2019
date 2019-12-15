const {runIntCode} = require('../common/intCode');

const solve = input => {
    return createMap(input, false);
};

const createMap = (input, returnMap = true) => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    const visited = {};
    const config = {integers, index: 0, base: 0, inputIndex: 0, inputs: [], returnOnOutput: true};
    let x = 0;
    let y = 0;
    const steps = [];

    while (true) {
        let dir = [1,2,3,4].find(dir => {
            const offset = getDirectionOffsets(dir);
            return visited[getID(x + offset.x, y + offset.y)] === undefined;
        });

        if (dir) {
            config.inputs = [dir];
            const out = runIntCode(config);
            const offset = getDirectionOffsets(dir);

            visited[getID(x + offset.x, y + offset.y)] = out;
            if (out === 1 || out === 2) {
                x += offset.x;
                y += offset.y;
                let opposite = 1;
                if (dir === 1) opposite = 2;
                else if (dir === 3) opposite = 4;
                else if (dir === 4) opposite = 3;
                steps.push(opposite);
                if (out === 2 && !returnMap) {
                    return steps.length;
                }
            }
        } else if (steps.length) {
            dir = steps.pop();
            config.inputs = [dir];
            runIntCode(config);
            const offset = getDirectionOffsets(dir);
            x += offset.x;
            y += offset.y;
        } else {
            return visited;
        }
    }
};

const getDirectionOffsets = direction => {
    let x = 0;
    let y = 0;
    if (direction === 1) {
        y = -1;
    } else if (direction === 2) {
        y = 1;
    } else if (direction === 3) {
        x = -1;
    } else if (direction === 4) {
        x = 1;
    }
    return {x, y};
};

const getID = (x, y) => `${x},${y}`;

module.exports = {
    solve,
    result: 228,
    createMap,
    getID
};
