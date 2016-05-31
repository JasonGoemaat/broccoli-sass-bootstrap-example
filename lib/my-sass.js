'use strict';

/******************************************************************************
 * my-sass
 * 
 * Compiles sass, right now just src/me.scss" compiled into 
 * "assets/compiled.css".
 * 
 * https://docs.omniref.com/js/npm/broccoli-sass/0.2.1
 ******************************************************************************/

var compileSass = require('broccoli-sass');
var mergeTrees = require('broccoli-merge-trees');

// var result = mergeTrees([
//     compileSass(['src'], 'me.scss', 'assets/compiled.css')
// ]);

module.exports = compileSass(['src'], 'me.scss', 'assets/compiled.css'); 
