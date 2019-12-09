const solve = input => {
    const pixels = input[0].split('').map(x => parseInt(x, 10));
    const pixelsPerLayer = 25 * 6;

    const merged = new Array(pixelsPerLayer).fill(2);
    for (let p = 0; p < pixelsPerLayer; p++) {
        merged[p] = 2;
        let index = p;
        while (merged[p] === 2 && index < pixels.length) {
            merged[p] = pixels[index];
            index += pixelsPerLayer;
        }
    }

    return print(merged, 25);
};

const print = (layer, cols) => {
    let str = '';
    for (let p = 0; p < layer.length; p++) {
        if (p % cols == 0 && p !== 0) {
            str += '\n';
        }
        str += layer[p] === 1 ? 'X' : ' ';
    }
    return str;
};



module.exports = {
    solve,
    result: 'XXXX XXX  XXXX X  X XXX  \n' +
            '   X X  X    X X  X X  X \n' +
            '  X  X  X   X  X  X XXX  \n' +
            ' X   XXX   X   X  X X  X \n' +
            'X    X    X    X  X X  X \n' +
            'XXXX X    XXXX  XX  XXX  '
    //'ZPZUB'
};
