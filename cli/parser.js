const _ = require('lodash');
const CONST = require('./const');
const Node = require('./utils/node');

function deepParse(list, parentNode) {
    if (list.length === 0) {
        return [];
    }
    _.forEach(list, (data, key) => {
        const node = new Node(data[CONST.NAME_KEY], data[CONST.ATTR_KEY]);
        if (node.isRule()) {
            parentNode.setRule(node.name, node);
        } else if (node.isParameter()) {
            parentNode.setParameter(node.name, node);
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

module.exports = function deepAnalysis(parseData) {
    const rootObj = parseData[CONST.ROOT_TAG];
    const rootNode = new Node(rootObj[CONST.NAME_KEY], rootObj[CONST.ATTR_KEY]);
    return deepParse(rootObj[CONST.CHILD_KEY], rootNode);
}