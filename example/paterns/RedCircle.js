module.exports = function (valueNode, node, arg, tab) {
    const {x,y,radius,alpha} = node.property;
    const code = [];
    code.push(`/* RedCircle */`); // NOTE use for comments only '/* */' because you can to comment all source code;
    code.push(`const ${valueNode} = new PIXI.Graphics()`);
    code.push(`${valueNode}.lineStyle(0)`);
    code.push(`${valueNode}.beginFill(0xFF0000, ${alpha|1})`);
    code.push(`${valueNode}.drawCircle(${x|0},${y|0},${radius|20})`);
    code.push(`${valueNode}.endFill()`);
    return {
        autoRender: true,
        code,
    }
}