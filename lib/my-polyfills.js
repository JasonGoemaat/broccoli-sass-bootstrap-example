'use strict';

/******************************************************************************
 * my-polyfill
 * 
 * Copies js polyfills included as scripts in html into the /vendor directory.
 * 
 ******************************************************************************/

var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = mergeTrees([
    funnel('node_modules/es6-shim', { destDir: 'vendor', include: ['es6-shim.js'] }),
    funnel('node_modules/systemjs/dist', { destDir: 'vendor', include: ['system.js', 'system-polyfill.js'] }),
    funnel('node_modules/zone.js/dist', { destDir: 'vendor', include: ['zone.min.js'] }),
    funnel('node_modules/reflect-metadata', { destDir: 'vendor', include: ['Reflect.js'] }),
]);
