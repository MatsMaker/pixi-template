const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const {promisify} = require('util');

const arguments = require('./argument');
const codeGenerator = require('./codeGenerator');

const parser = new xml2js.Parser();
const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);
const parserXMLPromise = promisify(parser.parseString);
const codeGeneratorPromise = promisify(codeGenerator);

readFilePromise(arguments.template)
    .then(fileData => parserXMLPromise(fileData))
    .then(parseData => codeGeneratorPromise(parseData))
    .then(code => writeFilePromise(arguments.output, code))
    .then(() => {
        console.log('Done')
    });

