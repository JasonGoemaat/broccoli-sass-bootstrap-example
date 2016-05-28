// https://www.npmjs.com/package/broccoli
var compileSass = require('broccoli-sass');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var compileTypescript = require('./lib/broccoli-typescript');

// https://docs.omniref.com/js/npm/broccoli-sass/0.2.1
var appCss = compileSass(['src'], 'me.scss', 'assets/compiled.css');

var bootstrapFonts = funnel('node_modules/bootstrap-sass/assets/fonts/bootstrap', {
    include: ['*.@(ttf|woff|woff2)'],
    destDir: 'assets/fonts'
});

// https://github.com/broccolijs/broccoli-funnel#broccoli-funnel
var index_html = funnel('src', {
    include: ['index.html']
});

// https://www.npmjs.com/package/broccoli-typescript
var ts = funnel('src', {
    include: ['app/**/*.ts', 'tsconfig.json', 'system.config.ts']
});
var js = new compileTypescript(ts, 'tsconfig.json', {});

// https://github.com/joliss/broccoli-uglify-js

// https://github.com/broccolijs/broccoli-merge-trees
module.exports = mergeTrees([appCss, index_html, bootstrapFonts, js]);
