const solve = (input) => {
    const path1 = input[0].split(',');
    const path2 = input[1].split(',');
    const pointsPath1 = pathToPoints(path1);
    const pointsPath2 = pathToPoints(path2);
    const intersections = findIntersections(pointsPath1, pointsPath2);
    return findShortestDistance(intersections);
};

const pathToPoints = path => {
    const points = [];
    let x = 0;
    let y = 0;
    let dir = '';
    let steps = 0;
    for (let i = 0; i < path.length; i++) {
        dir = path[i][0];
        steps = parseInt(path[i].substr(1).trim(), 10);
        while (steps > 0) {
            switch (dir) {
                case 'U': y++; break;
                case 'D': y--; break;
                case 'R': x++; break;
                case 'L': x--; break;
            }
            points.push(`${x},${y}`);
            steps--;
        }
    }
    return points;
};

const findIntersections = (pointsPath1, pointsPath2) => {
    const setB = new Set(pointsPath2);
    return [...new Set(pointsPath1)].filter(x => setB.has(x));
};

const manhattanDistance = (x1, y1, x2, y2) => {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
};

const findShortestDistance = intersections => {
    let minDist = 999999999;
    for (let i = 0; i < intersections.length; i++) {
        const cords = intersections[i].split(',');
        minDist = Math.min(minDist, manhattanDistance(0, 0, parseInt(cords[0], 10), parseInt(cords[1], 10)));
    }
    return minDist;
};

module.exports = {
    solve,
    pathToPoints,
    findIntersections
};

// RESULT: 273