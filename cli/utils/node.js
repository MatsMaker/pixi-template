
function isObject(name) {
    return name === name.toUpperCase();
}

function isArgument(name) {
    const firsSymbolName = getFirstSymbol(name);
    return firsSymbolName.toLowerCase() === firsSymbolName;
}

function isProperty(name) {
    return '$' === name;
}

function isRule(name) {
    return ':' === getFirstSymbol(name);
}

function getFirstSymbol(string) {
    let symbol;
    if (string.length > 1) {
        symbol = string[0];
    } else {
        symbol = string;
    }
    return symbol;
}

function getType(name) {
    if (isProperty(name)) {
        return 'property';
    }
    if (isRule(name)) {
        return 'rule';
    }
    if (isObject(name)) {
        return 'object';
    }
    if (isArgument(name)) {
            return 'argument';
    }
    return null;
}


const sName = Symbol('name');
const sKey = Symbol('key');
const sData = Symbol('data');
const sType = Symbol('type');


module.exports = class Note {

    set name(name) {
        this[sName] = name;
        this[sType] = getType(name);
    }

    get name() {
        return this[sName];
    }

    set data(data) {
        this[sData] = data;
    }

    get data() {
        return this[sData];
    }

    get type() {
        return this[sType];
    }

    constructor(name, data) {
        this.name = name;
        this.data = data;
    }

}