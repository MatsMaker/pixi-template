function isNumber(s){
    return !isNaN(s);
}


module.exports = class Writer {

    get text() {
        return this._rows.join(this._rowSplit);
    }

    constructor(rows, rowSplit = ';') {
        this._rowSplit = rowSplit;
        this._rows = rows || [];
    }

    rootStage(lvlSlice, app) {
        this.addRow(`const ${lvlSlice} = ${app}.stage`);
    }

    addNode(lvlSlice, child) {
        this.addRow(`${lvlSlice}.addChild(${child})`);
    }

    setNodeProperty(nodeProperty, lvlSlice) {
        const codeRows = [];
        _.forEach(nodeProperty, (value, property) => {
            const propertyValue = (isNumber(value)) ? parseFloat(value) : `'${value}'`;
            codeRows.push(`${lvlSlice}.${property} = ${propertyValue}`);
        });
        this.addRow.push(...codeRows);
    }

    addRow(string = '') {
        this._rows.push(string);
    }

}