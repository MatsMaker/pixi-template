const _ = require('lodash');
const parser = require('./parser');
const Writer = require('./writer');

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
}

function sliceGenerator(lvlSlice, rootNode, writer) {
    _.forEach(rootNode.children, node => {
        const idGenerator = generatorId();

        if (node.isObject()) {
            writer.newSpace();

            const nodeId = idGenerator.new();
            const nameSlice = node.property.name || node.name;
            const valueNode = `${nameSlice}_${nodeId}`;

            if (_.isEmpty(node.rules)) {
                baseNodeGenerate(valueNode, node, lvlSlice, writer);
            } else {
                baseNodeGenerate(valueNode, node, lvlSlice, writer);
            }

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