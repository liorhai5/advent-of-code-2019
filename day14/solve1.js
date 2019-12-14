const solve = input => {
    const store = parseData(input);
    return getRequiredOres(store, 'FUEL', 1);
};

const parseData = input => {
    const reactions = input.map(line => {
        let split = line.split('=>').map(part => part.split(',').map(comp => {
            comp = comp.trim().split(' ');
            return {
                amount: parseInt(comp[0], 10),
                name: comp[1]
            };
        }));
        return {
            reactions: split[0],
            product: split[1][0]
        };
    });

    const store = {};
    for (let reaction of reactions){
        store[reaction.product.name] = {
            reactions: reaction.reactions,
            amount: reaction.product.amount,
            reminder: 0
        };
    }
    return store;
};

const getRequiredOres = (store, name, amountToMake) => {
    if (name === 'ORE') {
        return amountToMake;
    }
    let reaction = store[name];

    if (reaction.reminder > amountToMake){
        reaction.reminder -= amountToMake;
        return 0;
    }

    amountToMake -= reaction.reminder;
    let reminder = reaction.amount - (amountToMake % reaction.amount);
    if(reminder === reaction.amount) {
        reminder = 0;
    }
    reaction.reminder = reminder;


    let multiplayer = Math.ceil(amountToMake / reaction.amount);

    let total = 0;
    for (let cmp of reaction.reactions) {
        total += getRequiredOres(store, cmp.name, cmp.amount * multiplayer);
    }
    return total;
};


module.exports = {
    solve,
    result: 114125,
    getRequiredOres,
    parseData
};