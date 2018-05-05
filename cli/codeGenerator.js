const _ = require('lodash');

function capitalLatter(string) {
    if (string.length > 1) {

    }
    return 
}


module.exports = function(parseData, cb) {

    const code = `
const root = ${parseData.root.$.name};
    `;

    _.forEach(parseData.root, (node, index) => {
        if (index === '$') {
            return;
        }
    });

    cb(null, code);
}