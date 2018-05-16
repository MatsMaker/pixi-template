const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const {promisify} = require('util');

const appSettings = require('./utils/argumentRun');
const mainGenerator = require('./codeGenerator').mainGenerator;

const parser = new xml2js.Parser({
    attrkey: '$',
    childkey: '$$',
    explicitArray: true,
    explicitChildren: true,
    preserveChildrenOrder: true,
    trim: true,
});
const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);
const parserXMLPromise = promisify(parser.parseString);
const mainGeneratorPromise = promisify(mainGenerator);

readFilePromise(appSettings.template)
    .then(fileData => parserXMLPromise(fileData))
    .then(parseData => mainGeneratorPromise(parseData))
    .then(code => writeFilePromise(appSettings.output, code))
    .then(() => {
        console.log('Done!')
    });

