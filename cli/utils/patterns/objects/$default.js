module.exports = function (valueNode, node, arg) {
    return {
        autoRender: true,
        code: `const ${valueNode} = new PIXI.${node.name}(${arg})`
    }
}