const _ = require('lodash');

module.exports = async function (rootNode, behaviorIndex, writer, lvlSlice) {
    const analysis = require('../../../../analysis');
    const parser = require('../../../../codeGenerator/parser');
    const analysedFile = await analysis(rootNode.children[behaviorIndex].property.src + '.xml');
    rootNode.children.splice(behaviorIndex, 1);
    const newNode = parser(analysedFile);
    _.forEach(newNode.children, (n, i) => {
        n.parent = rootNode;
        rootNode.addChild(n);
    });
}