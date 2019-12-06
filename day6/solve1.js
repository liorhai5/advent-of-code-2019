const solve = input => {
    const directOrbits = inputToMap(input);
    let count = 0;
    for (let orbit in directOrbits) {
        count += getOrbitsPathFromTo(orbit, 'COM', directOrbits).length;
    }
    return count;
};

const inputToMap = input => {
    const directOrbits = {};
    for (let i = 0; i < input.length; i++) {
        const split = input[i].trim().split(')');
        directOrbits[split[1]] = split[0];
    }
    return directOrbits;
};

const getOrbitsPathFromTo = (fromOrbit, toOrbit, directOrbits) => {
    let _orbit = fromOrbit;
    let _center = directOrbits[fromOrbit];
    const centers = [_center];
    while (_center !== toOrbit) {
        _orbit = _center;
        _center = directOrbits[_orbit];
        centers.push(_center);
    }
    return centers;
};

module.exports = {
    solve,
    inputToMap,
    getOrbitsPathFromTo
};

// RESULT: 224901