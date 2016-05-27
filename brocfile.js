// https://www.npmjs.com/package/broccoli
var compileSass = require('broccoli-sass');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

// https://docs.omniref.com/js/npm/broccoli-sass/0.2.1
var appCss = compileSass(['src'], 'me.scss', 'assets/compiled.css');

// https://github.com/broccolijs/broccoli-funnel#broccoli-funnel
var index_html = funnel('src', {
    include: ['index.html']
});

// https://github.com/broccolijs/broccoli-merge-trees
module.exports = mergeTrees([appCss, index_html]);