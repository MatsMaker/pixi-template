module.exports = (function getArguments() {
    return require('minimist')(process.argv.slice(2));
})();
