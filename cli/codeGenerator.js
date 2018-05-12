const _ = require('lodash');
const Writer = require('./utils/writer');
const parser = require('./parser');

function generatorId(startId = -1) {
    return {
        new: () => {
            startId++;
            return startId;
        },
        last: () => startId
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
            const arg = writer.addArguments(node);

            writer.addObject(valueNode, node, arg);

            if (node.children.length > 0) {
                sliceGenerator(valueNode, node, writer);
            }

            writer.setNodeProperty(valueNode, node);
            writer.addNodeTo(valueNode, lvlSlice);

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


module.exports = mainGenerator;