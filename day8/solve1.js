const solve = input => {
    const pixels = input[0].split('').map(x => parseInt(x, 10));
    const pixelsPerLayer = 25 * 6;
    const numLayers = pixels.length / pixelsPerLayer;
    const zerosPerLayer = new Array(numLayers).fill(0);

    for (let i = 0; i < numLayers; i++) {
        zerosPerLayer[i] = findOccurrencesCount(pixels, i, pixelsPerLayer, 0);
    }

    let layerWithFewerZeros = 0;
    let fewerZerosCount = Infinity;
    for (let j = 0; j < zerosPerLayer.length; j++) {
        if (zerosPerLayer[j] < fewerZerosCount) {
            layerWithFewerZeros = j;
            fewerZerosCount = zerosPerLayer[j];
        }
    }

    const numOnes = findOccurrencesCount(pixels, layerWithFewerZeros, pixelsPerLayer, 1);
    const numTwos = findOccurrencesCount(pixels, layerWithFewerZeros, pixelsPerLayer, 2);

    return numOnes * numTwos;
};

const findOccurrencesCount = (pixels, layerIndex, pixelsPerLayer, digit) => {
    let count = 0;
    const startIndex = layerIndex * pixelsPerLayer;
    for (let i = startIndex; i < startIndex + pixelsPerLayer; i++) {
        if (pixels[i] === digit) {
            count++;
        }
    }
    return count;
};


module.exports = {
    solve
};

// RESULT: 1690

