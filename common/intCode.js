const POSITION = 0
const IMMEDIATE = 1;
const RELATIVE = 2;

const runIntCode = (config, inputs) => {
    let index = config.index;
    let integers = config.integers;
    let returnOnOutput = config.returnOnOutput;
    let returnFirstInteger = config.returnFirstInteger;
    const outputs = [];
    let inputIndex = 0;
    let base = config.base || 0;

    while (index < integers.length) {
        const instruction = (integers[index] + '').split('');
        const opcode = Number.parseInt([instruction.pop(), instruction.pop()].reverse().join(''));
        const mode1 = Number.parseInt(instruction.pop() || 0);
        const mode2 = Number.parseInt(instruction.pop() || 0);
        const mode3 = Number.parseInt(instruction.pop() || 0);

        // add
        if (opcode == 1) {
            const value1 = readValue(integers, mode1, integers[index + 1], base);
            const value2 = readValue(integers, mode2, integers[index + 2], base);
            const value3 = getWriteIndex(integers, mode3, integers[index + 3], base);
            integers[value3] = value1 + value2;
            index += 4;
        }

        // multiply
        else if (opcode == 2) {
            const value1 = readValue(integers, mode1, integers[index + 1], base);
            const value2 = readValue(integers, mode2, integers[index + 2], base);
            const value3 = getWriteIndex(integers, mode3, integers[index + 3], base);
            integers[value3] = value1 * value2;
            index += 4;
        }

        // input
        else if (opcode == 3) {
            const value1 = getWriteIndex(integers, mode1, integers[index + 1], base);
            integers[value1] = inputs[inputIndex];
            if (inputIndex + 1 < inputs.length) {
                inputIndex++;
            }
            index += 2;
        }

        // output
        else if (opcode == 4) {
            const value1 = readValue(integers, mode1, integers[index + 1], base);
            outputs.push(value1);
            index += 2;
            if (returnOnOutput) {
                config.index = index;
                return value1;
            }
        }

        // jump if true
        else if (opcode == 5) {
            const value1 = readValue(integers, mode1, integers[index + 1], base);
            const value2 = readValue(integers, mode2, integers[index + 2], base);
            index = value1 !== 0 ? value2 : index + 3;
        }

        // jump if false
        else if (opcode == 6) {
            const value1 = readValue(integers, mode1, integers[index + 1], base);
            const value2 = readValue(integers, mode2, integers[index + 2], base);
            index = value1 === 0 ? value2 : index + 3;
        }

        // less than
        else if (opcode == 7) {
            const value1 = readValue(integers, mode1, integers[index + 1], base);
            const value2 = readValue(integers, mode2, integers[index + 2], base);
            const value3 = getWriteIndex(integers, mode3, integers[index + 3], base);
            integers[value3] = value1 < value2 ? 1 : 0;
            index += 4;
        }

        // equal
        else if (opcode == 8) {
            const value1 = readValue(integers, mode1, integers[index + 1], base);
            const value2 = readValue(integers, mode2, integers[index + 2], base);
            const value3 = getWriteIndex(integers, mode3, integers[index + 3], base);
            integers[value3] = value1 === value2 ? 1 : 0;
            index += 4;
        }

        // change base
        else if (opcode == 9) {
            const value1 = readValue(integers, mode1, integers[index + 1], base);
            base += value1;
            index += 2;
            config.base = base;
        }

        else if (opcode == 99) { // break
            index = integers.length;
            config.index = index;
        }
    }

    if (returnFirstInteger) {
        return integers[0];
    }
    else if (returnOnOutput) {
        return -1;
    }
    return outputs[outputs.length - 1];
};

const readValue = (integers, mode, param, base = 0) => {
    if (mode === IMMEDIATE) {
        return param;
    } else if (mode === RELATIVE) {
        return integers[base + param] || 0;
    } else {
        return integers[param] || 0;
    }
};

const getWriteIndex = (integers, mode, param, base = 0) => {
    if (mode === RELATIVE) {
        return base + param;
    } else {
        return param
    }
};

module.exports = {
    runIntCode
};