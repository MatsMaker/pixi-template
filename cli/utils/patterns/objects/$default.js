module.exports = function (valueNode, node, arg) {
    return {
        autoRender: true,
        string: `const ${valueNode} = new PIXI.${node.name}(${arg})`
    }
}