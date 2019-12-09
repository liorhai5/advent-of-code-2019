const {inputToMap, getOrbitsPathFromTo} = require('./solve1');

const solve = input => {
    const directOrbits = inputToMap(input);
    const pathYou = getOrbitsPathFromTo('YOU', 'COM', directOrbits);
    const pathSan = getOrbitsPathFromTo('SAN', 'COM', directOrbits);
    const intersectionIndexes = getPathsIntersectionIndexes(pathYou, pathSan);
    return intersectionIndexes[0] + intersectionIndexes[1] - 1;
};

const getPathsIntersectionIndexes = (path1, path2) => {
    let index1 = 0;
    let index2 = 0;
    let found = false;
    for (; index1 < path1.length && !found; index1++) {
        index2 = path2.indexOf(path1[index1]);
        if (index2 >= 0) {
            found = true;
        }
    }
    return [index1, index2];
};

module.exports = {
    solve,
    result: 334
};