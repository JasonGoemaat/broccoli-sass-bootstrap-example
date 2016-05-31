'use strict';

/******************************************************************************
 * my-content
 * 
 * Copy over html/css files directly to the same folders in the output.
 * 
 ******************************************************************************/

var funnel = require('broccoli-funnel');

var bootstrapFonts = funnel('node_modules/bootstrap-sass/assets/fonts/bootstrap', {
    include: ['*.@(ttf|woff|woff2)'],
    destDir: 'assets/fonts'
});

module.exports = bootstrapFonts;
