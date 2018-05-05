const _ = require('lodash');

function isNumber(s){
    return !isNaN(s);
}

function capitalLatter(string) {
    let symbol;
    if (string.length > 1) {
        symbol = string[0];
    } else {
        symbol = string;
    }
    return symbol === symbol.toUpperCase();
}

function setProperty(nodeProperty, lvlSlice) {
    const codeRow = [];
    _.forEach(nodeProperty, (value, property) => {
        const propertyValue = (isNumber(value)) ? parseFloat(value) : `'${value}'`;
        codeRow.push(`${lvlSlice}.${property} = ${propertyValue};`);
    });
    return codeRow;
}

function addNode(lvlSlice, child) {
    return `${lvlSlice}.addChild(${child});`
}

function generatorId(startId = -1) {
    return {
        new: () => {
            startId++;
            return startId;
        },
        last: () => startId
    }
}


module.exports = function(parseData, cb) {

    const lvlSlice = 'rootContainer';
    let code = `const ${lvlSlice} = ${parseData.root.$.name}.stage;\n`;

    _.forEach(parseData.root, (nodeData, nodeName) => {

        const idGenerator = generatorId();
        const codeRows = [];

        if (nodeName === '$') {
            return;
        }

        if (capitalLatter(nodeName)) {
            const texture = `PIXI.Texture.fromImage('assets/bunny.png')`;

            const nodeId = idGenerator.new();
            const valueNode = `${nodeName}_${nodeId}`;

            codeRows.push(`const ${valueNode} = new PIXI.${nodeName}(${texture});`);
            codeRows.push(...setProperty(nodeData[0].$, valueNode, code));
            codeRows.push(addNode(lvlSlice, valueNode));

            code += codeRows.join('\n');
            return;
        }

        if (!capitalLatter(nodeName)) {
            return;
        }

    });


    cb(null, code);
}