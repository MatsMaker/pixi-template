const _ = require('lodash');
const appSettings = require('./utils/argumentRun');
const ROW_SPLIT = (appSettings.n) ? `;\n` : ';';
const writer = new require('./writer')([], ROW_SPLIT);

function capitalLatter(string) {
    let symbol;
    if (string.length > 1) {
        symbol = string[0];
    } else {
        symbol = string;
    }
    return symbol === symbol.toUpperCase();
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


function sliceParse(parseData, cb) {

    const lvlSlice = 'rootContainer';

    let code = rootStage(lvlSlice, parseData.root.$.name);
    const codeRows = [];

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

            codeRows.push(`const ${valueNode} = new PIXI.${nodeName}(${texture})`);
            codeRows.push(...setProperty(nodeData[0].$, valueNode, code));
            codeRows.push(addNode(lvlSlice, valueNode));

            code += codeRows.join(ROW_SPLIT);
            return;
        }

        if (!capitalLatter(nodeName)) {
            return;
        }

    });


    cb(null, code);
}


module.exports = sliceParse;