const _ = require('lodash');
const parser = require('./parser');
const Writer = require('./writer');

const appSettings = require('../utils/argumentRun');
const extendRules = (appSettings.rulesFile) ? require(path.join('./', appSettings.rulesFile)) : {};
const RULES = Object.assign({}, require('./rules'), extendRules);

function generatorId(startId = -1) {
    return {
        new: () => {
            startId++;
            return startId;
        },
        last: () => startId
    }
}

function baseNodeGenerate(valueNode, node, lvlSlice, writer) {
    const arg = writer.addArguments(node);
    const newObjRender = writer.addObject(valueNode, node, arg);

    if (node.children.length > 0) {
        sliceGenerator(valueNode, node, writer);
    }

    writer.setNodeProperty(valueNode, node);
    if (!_.isUndefined(newObjRender)) {
        writer.addNodeTo(valueNode, lvlSlice);
    }
    return writer;
}

function sliceGenerator(lvlSlice, rootNode, writer) {
    
    _.forEach(rootNode.children, (cNode, nIndex) => {
        _.forEach(Object.keys(cNode.rules), key => {
            if (!_.isUndefined([key])) {
                RULES[key](cNode, nIndex);
            }
        });
    });

    _.forEach(rootNode.children, (node, nIndex) => {
        if (node.isBehavior()) {
            if (!_.isUndefined(writer.patterns[node.name])) {
                return await writer.patterns[node.name](rootNode, nIndex, writer, lvlSlice);
            }else {
                throw `${node.name} is non existent behavior`;
            }
           
        }
    });

    _.forEach(rootNode.children, (node, nIndex) => {
        const idGenerator = generatorId();

        if (node.isObject()) {
            writer.newSpace();

            const nodeId = idGenerator.new();
            const nameSlice = node.property.name || node.name;
            const valueNode = `${nameSlice}_${nodeId}`;

            baseNodeGenerate(valueNode, node, lvlSlice, writer);

            writer.closeSpace();
            return;
        }

    });
    return writer;
}


function mainGenerator (parseData, cb) {

    const rootNode = parser(parseData);
    const lvlSlice = 'rootContainer';
    let writer = new Writer();

    writer.rootStage(lvlSlice, rootNode.property.appName);
    writer = sliceGenerator(lvlSlice, rootNode, writer);

    cb(null, writer.getText());
}


module.exports = {
    mainGenerator,
    baseNodeGenerate
};