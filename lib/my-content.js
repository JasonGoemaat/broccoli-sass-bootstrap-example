'use strict';

/******************************************************************************
 * my-content
 * 
 * Copy over html/css files directly to the same folders in the output.
 * 
 ******************************************************************************/

var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = funnel('src', { include: ['**/*.html', "**/*.css"] });
