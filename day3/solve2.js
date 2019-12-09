const {pathToPoints, findIntersections} = require('./solve1');

const solve = input => {
    const path1 = input[0].split(',');
    const path2 = input[1].split(',');
    const pointsPath1 = pathToPoints(path1);
    const pointsPath2 = pathToPoints(path2);
    const intersections = findIntersections(pointsPath1, pointsPath2);
    return findShortestDistance(pointsPath1, pointsPath2, intersections);
};

const findShortestDistance = (pointsPath1, pointsPath2, intersections) => {
    let minDist = 999999999;
    for (let i = 0; i < intersections.length; i++) {
        const steps1 = pointsPath1.findIndex(p => p === intersections[i]) + 1;
        const steps2 = pointsPath2.findIndex(p => p === intersections[i]) + 1;
        minDist = Math.min(minDist, steps1 + steps2);
    }
    return minDist;
};

module.exports = {
    solve,
    result: 15622
};