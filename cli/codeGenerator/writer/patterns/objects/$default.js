module.exports = function (valueNode, node, arg) {
    return `const ${valueNode} = new PIXI.${node.name}(${arg})`;
}