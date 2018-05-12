const path = require('path');
const _ = require('lodash');
const appSettings = require('../utils/argumentRun');
const PATTERNS = require('./patterns');
const ROW_SPLIT = (appSettings.f) ? `;\n` : ';';

function isNumber(s){
    return !isNaN(s);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

module.exports = class Writer {

    getText() {
        if (this._indentIndex !== 0) {
            return new Error('Not all namespaces are closed');
        }
        return this._rows.join(this._rowSplit) + this._rowSplit;
    }

    constructor(rows = [], basePatterns = PATTERNS) {
        this._rowSplit = ROW_SPLIT;
        this._formatting = appSettings.f;
        this._rows = rows || [];
        this._indentSpace = '   ';
        this._indentIndex = 0;
        this._patterns = this._getPatterns(basePatterns);
    }

    rootStage(lvlSlice, app) {
        this.addRow(`const ${lvlSlice} = ${app}.stage`);
    }

    setNodeProperty(lvlSlice, node) {
        _.forEach(node.property, (value, property) => {
            const propertyValue = (isNumber(value)) ? parseFloat(value) : `'${value}'`;
            this.addRow(`${lvlSlice}['${property}'] = ${propertyValue}`);
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

    addObject(valueNode, node, arg) {
        const pattern = this._patterns[node.name] || this._patterns['$defaultObject'];
        const patternResult = pattern(valueNode, node, arg.join(','), this.getIndent());
        this.addRow(patternResult.string);
        return patternResult.autoRender;
    }

    addArguments(node) {
        const arglist = [];
        _.forEach(node.arguments, (arg, i) => {
            const valueName = arg.name + i;
            const pattern = this._patterns[node.name] || this._patterns['$defaultArguments'];
            const patternResult = pattern(valueName, arg, node, i);
            if (!_.isUndefined(patternResult.string) && patternResult.autoRender)  {
                this.addRow(patternResult.string);
            }
            arglist.push(valueName);
            return valueName;
        });
        return arglist;
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

    _getPatterns(basePatterns) {
        if (appSettings.patternsFile) {
            const extendPatterns = require(path.join('./', appSettings.patternsFile));
            return Object.assign({}, basePatterns, extendPatterns);
        }
        return patterns;
    };

}