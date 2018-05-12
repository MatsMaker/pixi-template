module.exports = function(valueName, textureArg) {
    return `const ${valueName} = PIXI.Texture.fromImage('${textureArg.property.fromImage}')`
}