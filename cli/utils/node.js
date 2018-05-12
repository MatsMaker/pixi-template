
function isObject(name) {
    const firsSymbolName = getFirstSymbol(name);
    return name === firsSymbolName.toUpperCase() + name.substr(1);
}

function isTheme(name) {
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
    return string.substr(0, 1);
}

function getType(name) {
    if (isProperty(name)) {
        return 'property';
    }
    if (isRule(name)) {
        return 'rule';
    }
    if (isTheme(name)) {
        return 'theme';
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
const sProperty = Symbol('property');
const sType = Symbol('type');
const sChildren = Symbol('children');
const sRules = Symbol('rules');
const sArguments = Symbol('arguments');


module.exports = class Note {

    set name(name) {
        this[sName] = name;
        this[sType] = getType(name);
    }

    get name() {
        return this[sName];
    }

    set property(property) {
        this[sProperty] = property;
    }

    get property() {
        return this[sProperty];
    }

    getProperty(pName) {
        return this[sProperty][pName];
    }

    get type() {
        return this[sType];
    }
    
    get children() {
        return this[sChildren];
    }

    get rules() {
        return this[sRules];
    }

    get arguments() {
        return this[sArguments]
    }

    addChild(child) {
        this[sChildren].push(child);
    }

    addRule(rule) {
        this[sRules].push(rule);
    }

    addArgument(arg) {
        this[sArguments].push(arg);
    }

    isRule() {
        return isRule(this.name);
    }

    isArgument() {
        return isArgument(this.name);
    }

    isObject() {
        return isObject(this.name);
    }

    constructor(name, property) {
        this[sChildren] = [];
        this[sRules] = [];
        this[sArguments] = [];
        this.name = name;
        this.property = property;
    }

}