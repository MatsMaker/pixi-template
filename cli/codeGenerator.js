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

function deepParse(list, parentNode, isRoot = false) {
    _.forEach(list, (data, key) => {
        const node = new Node(key, data);
        if (node.type === 'property') {
            parentNode['property'] = data;
            return;
        }
        if (_.isNull(parentNode)) {
            parentNode = node;
        } else if (!_.isNull(node.type)) {
            const propertyName = node.type + "List";
            if (!_.isArray(parentNode[propertyName])) {
                parentNode[propertyName] = [];
            }
            parentNode[propertyName].push(node);
        }
        if (_.isArray(data)) {
            _.forEach(data, d => {
                deepParse(d, node);
            });
        } else if (node.type === 'object' || isRoot) {
            deepParse(data, node);
        }
    });
    return parentNode;
}


function sliceParse(parseData, cb) {

    const nodes = deepParse(parseData, null, true);

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