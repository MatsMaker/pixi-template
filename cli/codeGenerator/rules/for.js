const _ = require('lodash');

module.exports = function(node, nIndex) {
    const counter = parseInt(node.rules[':for']);

    node.parent.children.splice(nIndex, 1);
    const newNode = _.cloneDeep(node);
    newNode.parent = node.parent;
    delete newNode.rules[':for'];

    _.forEach(_.range(counter), index => {
        node.parent.children.splice(nIndex + index, 0, newNode);
    });
}