const solve = input => {
    let signals = input[0].split('').map(x => parseInt(x.trim(), 10));
    let offset = parseInt(signals.slice(0, 7).join(''), 10);

    const startingIndex = offset - offset % signals.length;
    const multNeeded = 10000 - startingIndex / signals.length;

    let multipliedSignals = [];
    for (let i = 0; i < multNeeded; i++) {
        multipliedSignals = multipliedSignals.concat(signals);
    }
    multipliedSignals = multipliedSignals.slice(offset % signals.length);

    for (let i = 0; i < 100; i++) {
        for (let j = multipliedSignals.length - 2; j >= 0; j--) {
            const signal = multipliedSignals[j] + multipliedSignals[j + 1];
            multipliedSignals[j] = Math.abs(signal) % 10;
        }
    }

    return multipliedSignals.slice(0, 8).join("")
};

module.exports = {
    solve,
    result: '85600369'
};