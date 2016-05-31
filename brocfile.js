// https://www.npmjs.com/package/broccoli
var mergeTrees = require('broccoli-merge-trees');

var sass = require('./lib/my-sass');
var polyfills = require('./lib/my-polyfills');
var content = require('./lib/my-content');
var assets = require('./lib/my-assets');
var typescript = require('./lib/my-typescript');

module.exports = mergeTrees([sass, polyfills, content, assets, typescript]);
//module.exports = typescript;
