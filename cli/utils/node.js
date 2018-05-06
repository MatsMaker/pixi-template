module.exports = class Note {

    set nodeName(newName) {
        this._nodeName = newName;
        this._firstSymbolName = this._getFirstSymbol(this._nodeName);
    }

    get nodeName() {
        return this._nodeName;
    }

    constructor(nodeName, nodeData){
        this._nodeData = nodeData;
        this.nodeName = nodeName;
    }
    
    isObject() {
        return this._nodeName === this._nodeName.toUpperCase();
    }

    isArgument() {
        return this._firstSymbolName === this._firstSymbolName.toLowerCase();
    }
    
    isProperty() {
        return '$' === this._firstSymbolName;
    }
    
    isRule() {
        return ':' === this._firstSymbolName;
    }

    notEmpty() {
        return Object.keys(this._nodeData).filter(key => capitalLatter(key)).length > 0;
    }
    
    hasArguments() {
        return Object.keys(this._nodeData).filter(key => key !== '$').length > 0;
    }

    _getFirstSymbol(string) {
        let symbol;
        if (string.length > 1) {
            symbol = string[0];
        } else {
            symbol = string;
        }
        return symbol;
    }

}