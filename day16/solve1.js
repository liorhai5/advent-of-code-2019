const solve = input => {
    let signals = input[0].split('').map(x => parseInt(x.trim(), 10));
    let pattern = [0, 1, 0, -1];

    for (let i = 0; i < 100; i++) {
        signals = applyPatternToSignals(signals, pattern);
    }

    return signals.slice(0, 8).join('');
};

const applyPatternToSignals = (signals, pattern) => {
    const output = Array(signals.length).fill(0);
    for (let i = 0; i < signals.length; i++) {
        let multipliedPattern = multiplyPattern(pattern, i);
        let patternIndex = 1;
        let value = 0;
        for (let s = 0; s < signals.length; s++) {
            value += signals[s] * multipliedPattern[patternIndex];
            patternIndex++;
            if (patternIndex >= multipliedPattern.length) {
                patternIndex = 0;
            }
            if (s === signals.length - 1) {
                output[i] = Math.abs(value) % 10;
            }
        }
    }
    return output;
};

const multiplyPattern = (pattern, position) => {
    const newPattern = [];
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j <= position; j++) {
            newPattern.push(pattern[i]);
        }
    }
    return newPattern;
};

module.exports = {
    solve,
    result: '96136976',
    applyPatternToSignals
};