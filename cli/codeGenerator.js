const _ = require('lodash');
const Writer = require('./utils/writer');
const Node = require('./utils/node');
const CONST = require('./const');

function generatorId(startId = -1) {
    return {
        new: () => {
            startId++;
            return startId;
        },
        last: () => startId
    }
}

function deepParse(list, parentNode) {
    if (list.length === 0) {
        return [];
    }
    _.forEach(list, (data, key) => {
        const node = new Node(data[CONST.NAME_KEY], data[CONST.ATTR_KEY]);
        parentNode.addChild(node);
        if (_.isArray(data[CONST.CHILD_KEY])) {
            deepParse(data[CONST.CHILD_KEY], node);
        } else {
            return [];
        }
    });
    return parentNode;
}


function sliceParse(parseData, cb) {

    const rootObj = parseData[CONST.ROOT_TAG];
    const rootNode = new Node(rootObj[CONST.NAME_KEY], rootObj[CONST.ATTR_KEY]);
    const nodes = deepParse(rootObj[CONST.CHILD_KEY], rootNode);

    const lvlSlice = 'rootContainer';
    const writer = new Writer();

    // writer.rootStage(lvlSlice, parseData.root.$.name);
    // _.forEach(parseData.root, (nodeData, nodeName) => {

    //     const idGenerator = generatorId();
    //     const node = new Node(nodeName, nodeData);

    //     if (node.isArgument()
    //         || node.isProperty()
    //         || node.isRule()) {
    //         return;
    //     }

    //     if (node.isObject()) {
    //         writer.newSpace();

    //         const arg = writer.addArguments();
    //         const nodeId = idGenerator.new();
    //         const valueNode = `${nodeName}_${nodeId}`;

    //         writer.addObject(valueNode, nodeName, arg);
    //         writer.setNodeProperty(valueNode, nodeData[0].$);
    //         writer.addNodeTo(valueNode, lvlSlice);

    //         writer.closeSpace();
    //         return;
    //     }

    // });


    cb(null, writer.getText());
}


module.exports = sliceParse;