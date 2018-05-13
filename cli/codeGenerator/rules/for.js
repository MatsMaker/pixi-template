const _ = require('lodash');

module.exports = function(node, nIndex) {
    const counter = parseInt(node.rules[':for']);

    node.parent.children.splice(nIndex, 1);

    _.forEach(_.range(counter), key => {
        const newNode = _.cloneDeep(node);
        newNode.parent = node.parent;
        delete newNode.rules[':for'];
        _.forEach(newNode.property, (pValue, pKey) => {
            const expression = pValue.match(/({{)(.*)(}})/);
            if (!_.isNull(expression)) {
                const res = eval(expression[2]);
                newNode.property[pKey] = pValue.replace(expression[0], res);
            }
        });
        node.parent.children.splice(nIndex + key, 0, newNode);
    });
}