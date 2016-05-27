var compileSass = require('broccoli-sass');

// compile 'me.scss' in the 'src' directory into 'compiled.css'
// in the '<output>/assets' directory
var appCss = compileSass(['src'], 'me.scss', 'assets/compiled.css');

// https://www.npmjs.com/package/broccoli
// say you have this command:
//     brocolli build output-dir
// Then whatever you put in 'module.exports' will get written to the
// 'output-dir' directory.  In this case, it is 'assets/me.css',
// the output of compileSass()
module.exports = appCss;
