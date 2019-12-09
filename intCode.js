const runIntCode = (config, inputs) => {
    let index = config.index;
    let integers = config.integers;
    let returnOnOutput = config.returnOnOutput;
    let returnFirstInteger = config.returnFirstInteger;
    const outputs = [];
    let inputIndex = 0;
    let base = 0;
    while (index < integers.length) {
        const {instruction, modes} = getInstructionAndModes(integers[index] + "");
        let interval = getInterval(instruction);

        while (modes.length < interval - 1) {
            modes.unshift(0);
        }

        let pos1 = getVal(integers, index + 1);
        let pos2 = getVal(integers, index + 2);

        let val1 = getValByMode(integers, pos1, modes[modes.length - 1], base);
        let val2 = getValByMode(integers, pos2, modes[modes.length - 2], base);
        // let target = integers[index + getIncrement(instruction)];
        // let target = getValByMode(integers, posT, modes[0], base);
        let target = getTarget(integers, index, instruction, modes[0], base);

        //console.log(`opt = ${integers[index]}, base = ${base} => instruction = ${instruction}, mode = ${modes[0]}, target = ${target}`);

        let jumpTo = -1;

        if (instruction == 1) { // add
            integers[target] = val1 + val2;
        }
        else if (instruction == 2) { // multiply
            integers[target] = val1 * val2;
        }
        else if (instruction == 3) { // input
            integers[target] = inputs[inputIndex];
            if (inputIndex + 1 < inputs.length) {
                inputIndex++;
            }
        }
        else if (instruction == 4) { // output
            if (returnOnOutput) {
                config.index = index + interval;
                return getVal(integers, target);
            }
            outputs.push(getVal(integers, target));
        }
        else if (instruction == 5) { // jump if true
            jumpTo = val1 != 0 ? val2 : -1;
        }
        else if (instruction == 6) { // jump if false
            jumpTo = val1 == 0 ? val2 : -1;
        }
        else if (instruction == 7) { // less than
            integers[target] = val1 < val2 ? 1 : 0;
        }
        else if (instruction == 8) { // equal
            integers[target] = val1 == val2 ? 1 : 0;
        }
        else if (instruction == 9) { // change base
            base += getVal(integers, target);
        }
        else if (integers[index] == 99) { // break
            index = integers.length;
        }

        if (jumpTo >= 0 ) {
            index = jumpTo;
        } else {
            index += interval;
        }
    }
    if (returnFirstInteger) {
        return integers[0];
    } else if (returnOnOutput) {
        return -1;
    }
    console.log(outputs)
    return outputs[outputs.length - 1];
};

const getTarget = (integers, index, instruction, mode, base) => {
    const increment = getInterval(instruction) - 1;
    return getValByMode(integers, index + increment, mode, base);
};

const getInterval = instruction => {
     if ([3,4,9].includes(instruction)) {
        return 2;
    } else if ([5,6].includes(instruction)) {
        return 3
    }
    return 4;

};

const getValByMode = (integers, pos, mode, base = 0) => {
    if (mode === 1) {
        return pos;
    }
    if (mode === 2) {
        return getVal(integers, pos + base);
    }
    return getVal(integers, pos);
};

const getVal = (arr, index) => {
    if (arr[index] === undefined) {
        return 0;
    }
    return arr[index];
};

const getInstructionAndModes = opt => {
    const instruction = parseInt(opt.slice(opt.length - 2), 10);
    const modes = opt.substring(0, opt.length - 2).split('').map(x => parseInt(x, 10));
    return {
        instruction,
        modes
    }
};


module.exports = {
    runIntCode
};