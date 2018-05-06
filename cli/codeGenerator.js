const _ = require('lodash');
const Writer = require('./utils/writer');
const Node = require('./utils/node');

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
    const writer = new Writer();

    writer.rootStage(lvlSlice, parseData.root.$.name);

    _.forEach(parseData.root, (nodeData, nodeName) => {

        const idGenerator = generatorId();
        const node = new Node(nodeName, nodeData);

        if (node.isArgument()
            || node.isProperty()
            || node.isRule()) {
            return;
        }

        if (node.isObject()) {
            writer.newSpace();

            const arg = writer.addArguments();
            const nodeId = idGenerator.new();
            const valueNode = `${nodeName}_${nodeId}`;

            writer.addObject(valueNode, nodeName, arg);
            writer.setNodeProperty(valueNode, nodeData[0].$);
            writer.addNodeTo(valueNode, lvlSlice);

            writer.closeSpace();
            return;
        }

    });


    cb(null, writer.getText());
}


module.exports = sliceParse;