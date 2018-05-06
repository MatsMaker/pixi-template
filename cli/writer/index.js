const _ = require('lodash');
const appSettings = require('../utils/argumentRun');

const ROW_SPLIT = (appSettings.f) ? `;\n` : ';';

function isNumber(s){
    return !isNaN(s);
}

module.exports = class Writer {

    getText() {
        if (this._indentIndex !== 0) {
            return new Error('Not all namespaces are closed');
        }
        return this._rows.join(this._rowSplit) + this._rowSplit;
    }

    constructor(rows = []) {
        this._rowSplit = ROW_SPLIT;
        this._formatting = appSettings.f;
        this._rows = rows || [];
        this._indentSpace = '   ';
        this._indentIndex = 0;
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

    newSpace() {
        this.addRow('{');
        this._indentIndex++;
    }

    closeSpace() {
        if (this._indentIndex < 0) {
            return new Error('All namespaces are closed');
        }
        this._indentIndex--;
        this.addRow('}');
    }

    addNodeTo(child, lvlSlice) {
        this.addRow(`${lvlSlice}.addChild(${child})`);
    }

    addNewPixiObject(valueNode, nodeName, params) {
        this.addRow(`const ${valueNode} = new PIXI.${nodeName}(${params})`);
    }

    addRow(string = '') {
        this._rows.push(this.getIndent() + string);
    }

    getIndent() {
        let indent = '';
        if (!this._formatting) {
            return indent;
        }
        for (let i = 0; i < this._indentIndex; i++) {
            indent += this._indentSpace;
        }
        return indent;
    }

    getProperty() {
        return `PIXI.Texture.fromImage('assets/bunny.png')`;
    }

}