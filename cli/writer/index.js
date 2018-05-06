const _ = require('lodash');

function isNumber(s){
    return !isNaN(s);
}


module.exports = class Writer {

    getText() {
        return this._rows.join(this._rowSplit) + this._rowSplit;
    }

    constructor(rows, rowSplit = ';') {
        this._rowSplit = rowSplit;
        this._rows = rows || [];
    }

    rootStage(lvlSlice, app) {
        this.addRow(`const ${lvlSlice} = ${app}.stage`);
    }

    setNodeProperty(lvlSlice, nodeProperty) {
        _.forEach(nodeProperty, (value, property) => {
            const propertyValue = (isNumber(value)) ? parseFloat(value) : `'${value}'`;
            this.addRow(`${lvlSlice}.${property} = ${propertyValue}`);
        });
    }

    addNodeTo(child, lvlSlice) {
        this.addRow(`${lvlSlice}.addChild(${child})`);
    }

    addNewPixiObject(valueNode, nodeName, params) {
        this.addRow(`const ${valueNode} = new PIXI.${nodeName}(${params})`);
    }

    addRow(string = '') {
        this._rows.push(string);
    }

}