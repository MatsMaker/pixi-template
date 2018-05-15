const fs = require('fs');
const xml2js = require('xml2js');
const {promisify} = require('util');

const parser = new xml2js.Parser({
    attrkey: '$',
    childkey: '$$',
    explicitArray: true,
    explicitChildren: true,
    preserveChildrenOrder: true,
    trim: true,
});

const readFilePromise = promisify(fs.readFile);
const parserXMLPromise = promisify(parser.parseString);


module.exports = function (file) {
    return readFilePromise(file)
        .then(fileData => parserXMLPromise(fileData))
}