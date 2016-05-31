'use strict';

/******************************************************************************
 * my-typescript
 * 
 * Compile typescript into javascript, will do bundling later?
 * NOTE: right now it's in debug mode?
 * 
 * // XX https://www.npmjs.com/package/broccoli-typescript
 * // actually using 'broccoli-typescript' from angular-cli project
 * // https://github.com/joliss/broccoli-uglify-js
 * 
 ******************************************************************************/

var compileTypescript = require('./broccoli-typescript');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

console.log('fetching typescript');
var ts = funnel('src', {
    include: ['**/*.ts', 'tsconfig.json']
});

var typings = funnel('typings', {
    include: ['**/*'],
    destDir: 'typings'
});

var mergedTs = mergeTrees([ts, typings]);

var js = new compileTypescript(mergedTs, 'tsconfig.json', {});

//var js = funnel(mergedTs, { destDir: 'mergedTs' });
//module.exports = mergeTrees([js, funnel(mergedTs, { destDir: 'debug/ts' })]);

var vendor = funnel('node_modules', {
    include: ['@angular/**/*.js', 'rxjs/**/*!(umd.).js'],
    exclude: ['**/*.umd.js'],
    destDir: 'vendor'
});


module.exports = mergeTrees([js, vendor]);