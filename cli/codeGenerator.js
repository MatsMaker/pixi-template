const _ = require('lodash');
const Writer = require('./writer');


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
    return Object.keys(nodeData).filter(key => capitalLatter(key)).length > 0;
}

function hasArguments(nodeData) {
    return Object.keys(nodeData).filter(key => key !== '$').length > 0;
}


function sliceParse(parseData, cb) {

    const lvlSlice = 'rootContainer';
    const writer = new Writer();

    writer.rootStage(lvlSlice, parseData.root.$.name);

    _.forEach(parseData.root, (nodeData, nodeName) => {

        const idGenerator = generatorId();

        if (nodeName === '$') {
            return;
        }

        if (capitalLatter(nodeName)) {
            writer.newSpace();

            let childData; 
            if (hasArguments(nodeData)) {
                childData = writer.getProperty(nodeData);
            }

            const nodeId = idGenerator.new();
            const valueNode = `${nodeName}_${nodeId}`;

            writer.addNewPixiObject(valueNode, nodeName, childData);
            writer.setNodeProperty(valueNode, nodeData[0].$);
            writer.addNodeTo(valueNode, lvlSlice);

            if (notEmpty(nodeData)) {
                // run recursive parser
            }

            writer.closeSpace();
            return;
        }

        if (!capitalLatter(nodeName)) {
            return;
        }

    });


    cb(null, writer.getText());
}


module.exports = sliceParse;