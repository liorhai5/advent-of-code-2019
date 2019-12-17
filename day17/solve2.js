const {runIntCode} = require('../common/intCode');
const {createGrid} = require('./solve1');

const solve = input => {
    let integers = input[0].split(',').map(x => parseInt(x.trim(), 10));
    integers[0] = 2;
    const config = {integers, returnAllOutputs: true, requestInputFn: output => {
        const grid = createGrid(output);
        const instructions = getInstructions(grid);
        const patterns = extractPatterns(instructions);
        const asciiInput = createAsciiInput(patterns);
        return asciiInput;
    }};
    const output = runIntCode(config);
    return output[output.length - 1];
};

const createAsciiInput = patterns => [
    ...patterns.order.join(',').split(''), '\n',
    ...patterns.A.join(',').split(''), '\n',
    ...patterns.B.join(',').split(''), '\n',
    ...patterns.C.join(',').split(''), '\n'
].map(char => ascii(char));

const extractPatterns = instructions => {
    const MIN_LENGTH = 6;
    const MAX_LENGTH = 11;
    let start = 0;
    let end = MIN_LENGTH;
    let candidatePatterns = {};

    // get candidate patterns
    while (start < end && start <= instructions.length - MIN_LENGTH) {
        const pattern = instructions.slice(start, end);
        candidatePatterns[pattern.join(',')] = pattern;

        end += 2;
        if (end > instructions.length || end - start > MAX_LENGTH) {
            start += 2;
            end = start + MIN_LENGTH;
        }
    }
    candidatePatterns = Object.values(candidatePatterns);

    // get sequences of patterns to check
    let combos = {};
    for (let a = 0; a < candidatePatterns.length; a++) {
        for (let b = 0; b < candidatePatterns.length; b++) {
            for (let c = 0; c < candidatePatterns.length; c++) {
                if (a !== b && b !== c && a !== c) {
                    const seq = [a, b, c].sort();
                    combos[seq.join(',')] = seq;
                }
            }
        }
    }
    combos = Object.values(combos);

    // check each combo for match
    let matchedCombo;
    let order;
    for (const combo of combos) {
        const A = candidatePatterns[combo[0]];
        const B = candidatePatterns[combo[1]];
        const C = candidatePatterns[combo[2]];
        const As = A.join(',');
        const Bs = B.join(',');
        const Cs = C.join(',');

        let matches = true;
        let checkIndex = 0;
        order = [];
        while (matches && checkIndex < instructions.length) {
            if (instructions.slice(checkIndex, checkIndex + A.length).join(',') === As) {
                checkIndex += A.length;
                order.push('A');
            } else if (instructions.slice(checkIndex, checkIndex + B.length).join(',') === Bs) {
                checkIndex += B.length;
                order.push('B');
            } else if (instructions.slice(checkIndex, checkIndex + C.length).join(',') === Cs) {
                checkIndex += C.length;
                order.push('C');
            } else {
                matches = false;
            }
        }
        if (matches) {
            matchedCombo = combo;
            break;
        }
    }

    return {
        A: candidatePatterns[matchedCombo[0]],
        B: candidatePatterns[matchedCombo[1]],
        C: candidatePatterns[matchedCombo[2]],
        order
    }
};

const getStartingPosAndDir = grid => {
    let pos = null;
    getPos: for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] !== '.' && grid[r][c] !== '#') {
                pos = {r, c};
                break getPos;
            }
        }
    }

    const dir = {x: 0, y: 0};
    switch (grid[pos.r][pos.c]) {
        case '^': dir.y = -1; break;
        case 'v': dir.y = 1; break;
        case '<': dir.x = -1; break;
        case '>': dir.x = 1; break;
    }

    return {pos, dir};
};

const getInstructions = grid => {
    let {pos, dir} = getStartingPosAndDir(grid);
    const instructions = [];
    let forwardSteps = 0;
    let hasValidStep = true;
    while (hasValidStep) {
        if (isValidStep(grid, pos, dir)) {
            forwardSteps++;
            pos.c += dir.x;
            pos.r += dir.y;
        } else if (isValidStep(grid, pos, getDirection(0, dir.x, dir.y))) {
            if (forwardSteps !== 0) {
                instructions.push(forwardSteps);
            }
            instructions.push('L');
            forwardSteps = 0;
            dir = getDirection(0, dir.x, dir.y);
        } else if (isValidStep(grid, pos, getDirection(1, dir.x, dir.y))) {
            if (forwardSteps !== 0) {
                instructions.push(forwardSteps);
            }
            instructions.push('R');
            forwardSteps = 0;
            dir = getDirection(1, dir.x, dir.y);
        } else {
            instructions.push(forwardSteps);
            hasValidStep = false;
        }
    }
    return instructions;
};

const getDirection = (dir, x, y) => {
    if (dir === 0) { // 0 = left
        if (x === 0) {
            x = y;
            y = 0;
        } else {
            y = -x;
            x = 0;
        }
    } else {
        if (x === 0) {
            x = -y;
            y = 0;
        } else {
            y = x;
            x = 0;
        }
    }
    return {x, y};
};

const isValidStep = (grid, pos, dir) => grid[pos.r + dir.y] && grid[pos.r + dir.y][pos.c + dir.x] === '#';

const print = grid => {
    let str = '';
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            str += grid[r][c];
        }
        str += '\n';
    }
    console.log(str);
};

const ascii = char => char.charCodeAt(0);

module.exports = {
    solve,
    result: 1022165
};
