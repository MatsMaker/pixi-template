module.exports = function (valueName, arg, node, i) {
    const method = Object.keys(arg.property)[0];
    const parameter = arg.property[method];
    const PIXIObject = arg.name.charAt(0).toUpperCase() + arg.name.slice(1)
    return `const ${valueName} = PIXI.${PIXIObject}.${method}('${parameter}')`
}