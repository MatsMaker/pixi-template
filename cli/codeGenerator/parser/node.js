const _ = require('lodash');

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

function isParameter(name) {
    return '_' === getFirstSymbol(name);
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
const sParameter = Symbol('parameter');


module.exports = class Note {

    set name(name) {
        this[sName] = name;
        this[sType] = getType(name);
    }

    get name() {
        return this[sName];
    }

    get property() {
        return this[sProperty];
    }

    get parameter() {
        return this[sParameter];
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

    addArgument(arg) {
        this[sArguments].push(arg);
    }

    setRule(rName, rValue) {
        this[sRules][rName] = rValue;
    }

    setProperty(pName, pValue) {
        this[sProperty][pName] = pValue;
    }

    setParameter(pName, pValue) {
        this[sParameter][pName] = pValue;
    }

    isRule() {
        return isRule(this.name);
    }

    isParameter() {
        return isParameter(this.name);
    }

    isArgument() {
        return isArgument(this.name);
    }

    isObject() {
        return isObject(this.name);
    }

    constructor(name, property) {
        this.parent = null;
        this[sChildren] = [];
        this[sArguments] = [];
        this[sRules] = {};
        this[sProperty] = {};
        this[sParameter] = {};

        this.name = name;
        const rulesKeys = Object.keys(property);
        _.forEach(Object.keys(property), key => {
            if (isRule(key)) {
                this.setRule(key, property[key]);
            } else if (isParameter(key)){
                this.setParameter(key, property[key]);
            } else {
                this.setProperty(key, property[key]);
            }
        });
    }

}