module.exports = function (valueNode, node, arg, tab) {
    const {x,y,radius,alpha} = node.property;
    const string = `// RedCircle
${tab}const ${valueNode} = new PIXI.Graphics();
${tab}${valueNode}.lineStyle(0);
${tab}${valueNode}.beginFill(0xFF0000, ${alpha|1});
${tab}${valueNode}.drawCircle(${x|0},${y|0},${radius|20});
${tab}${valueNode}.endFill();`
    return {
        autoRender: true,
        string,
    }
}