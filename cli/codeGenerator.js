const _ = require('lodash');
const appSettings = require('./utils/argumentRun');
const ROW_SPLIT = (appSettings.n) ? `;\n` : ';';
const Writer = require('./writer');
const writer = new Writer([], ROW_SPLIT);

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

function notEmpty(nodeData) {
    return Object.keys(nodeData).filter(key => key !== '$').length > 0;
} 


function sliceParse(parseData, cb) {

    const lvlSlice = 'rootContainer';

    writer.rootStage(lvlSlice, parseData.root.$.name);

    _.forEach(parseData.root, (nodeData, nodeName) => {

        const idGenerator = generatorId();

        if (nodeName === '$') {
            return;
        }

        if (capitalLatter(nodeName)) {
            let childData; 
            if (notEmpty(nodeData)) {
                childData = `PIXI.Texture.fromImage('assets/bunny.png')`;
            }

            const nodeId = idGenerator.new();
            const valueNode = `${nodeName}_${nodeId}`;

            writer.addNewPixiObject(valueNode, nodeName, childData);
            writer.setNodeProperty(valueNode, nodeData[0].$);
            writer.addNodeTo(valueNode, lvlSlice);
            return;
        }

        if (!capitalLatter(nodeName)) {
            return;
        }

    });


    cb(null, writer.getText());
}


module.exports = sliceParse;