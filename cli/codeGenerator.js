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
        if (node.isRule()) {
            parentNode.addRule(node);
        } else if (node.isArgument()){
            parentNode.addArgument(node);
        } else {
            parentNode.addChild(node);
        }
       
        if (_.isArray(data[CONST.CHILD_KEY])) {
            deepParse(data[CONST.CHILD_KEY], node);
        } else {
            return [];
        }
    });
    return parentNode;
}

function deepAnalysis(parseData) {
    const rootObj = parseData[CONST.ROOT_TAG];
    const rootNode = new Node(rootObj[CONST.NAME_KEY], rootObj[CONST.ATTR_KEY]);
    return deepParse(rootObj[CONST.CHILD_KEY], rootNode);
}


function sliceParse(parseData, cb) {

    const rootNode = deepAnalysis(parseData);
    const lvlSlice = 'rootContainer';
    const writer = new Writer();

    writer.rootStage(lvlSlice, rootNode.property.appName);

    _.forEach(rootNode.children, node => {
        const idGenerator = generatorId();

        if (node.isObject()) {
            writer.newSpace();

            const arg = writer.addArguments(node.arguments);
            const nodeId = idGenerator.new();
            const valueNode = `${node.name}_${nodeId}`;

            writer.addObject(valueNode, node.name, arg);
            writer.setNodeProperty(valueNode, node.property);
            writer.addNodeTo(valueNode, lvlSlice);

            writer.closeSpace();
            return;
        }

    });


    cb(null, writer.getText());
}


module.exports = sliceParse;