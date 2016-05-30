// https://www.npmjs.com/package/broccoli
var compileSass = require('broccoli-sass');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var compileTypescript = require('./lib/broccoli-typescript');
var instrument = require('broccoli-debug').instrument;
var wait = require('wait.for');
var fsExtra = require('fs-extra');

var outputTree = function(tree, path) {
    console.log('outputTree: ' + path);
    //fsExtra.emptyDir(path);
    //console.log('  source: ' + tree.inputPaths[0]);
};

// https://docs.omniref.com/js/npm/broccoli-sass/0.2.1
var appCss = compileSass(['src'], 'me.scss', 'assets/compiled.css');

var bootstrapFonts = funnel('node_modules/bootstrap-sass/assets/fonts/bootstrap', {
    include: ['*.@(ttf|woff|woff2)'],
    destDir: 'assets/fonts'
});

// https://github.com/broccolijs/broccoli-funnel#broccoli-funnel
var index_html = funnel('src', {
    include: ['**/*.html']
});

// https://www.npmjs.com/package/broccoli-typescript
console.log('fetching typescript');
var ts = funnel('src', {
    include: ['**/*.ts', 'tsconfig.json', 'system.config.ts']
});
outputTree(ts, '/c/t/broccoli/ts');

console.log('fetching typings');
var typings = funnel('typings', {
    include: ['**/*'],
    destDir: 'typings'
});
outputTree(typings, '/c/t/broccoli/typings');

console.log('merging ts + typings');
var mergedTs = mergeTrees([ts, typings]);
outputTree(mergedTs, '/c/t/broccoli/mergedTs');

console.log('compiling typescript...');
//var js = new compileTypescript(mergedTs, 'tsconfig.json', {});
var js = funnel(mergedTs, { destDir: 'mergedTs' });
// https://github.com/joliss/broccoli-uglify-js

// funnel individual js files we need from node modules to vendors
var result = mergeTrees([appCss, index_html, bootstrapFonts, js]);
var individualJs = mergeTrees([
    funnel('node_modules/es6-shim', { destDir: 'vendor', include: ['es6-shim.js'] }),
    funnel('node_modules/systemjs/dist', { destDir: 'vendor', include: ['system.js', 'system-polyfill.js'] }),
    funnel('node_modules/zone.js/dist', { destDir: 'vendor', include: ['zone.min.js'] }),
    funnel('node_modules/reflect-metadata', { destDir: 'vendor', include: ['Reflect.js'] }),
]);
result = mergeTrees([result, individualJs]);

// https://github.com/broccolijs/broccoli-merge-trees
module.exports = result;
