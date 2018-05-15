const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const mainGenerator = require('./codeGenerator').mainGenerator;

const appSettings = require('./utils/argumentRun');
const analysis = require('./analysis');

const writeFilePromise = promisify(fs.writeFile);
const mainGeneratorPromise = promisify(mainGenerator);


analysis(appSettings.template)
    .then(parseData => mainGeneratorPromise(parseData))
    .then(code => writeFilePromise(appSettings.output, code))
    .then(() => {
        console.log('Done!')
    });

