Check out the tag list at the bottom, with the repository in
varying states.  To see the file in action, `npm install -g lite-server`
and run `lite-server` to serve up `index.html`.

# **simple** 

## VERY simple broccoli-sass example

To start, you need to install broccoli and broccoli-sass:

    npm install --save-dev broccoli broccoli-sass
    
You should install the CLI globally I guess, this is what you
run from the command-line:

    npm install -g broccoli-cli
    
Now you create a `brocfile.js` file.  This will export a tree
or folder, and the build command will output it to the directory
you choose.  Say you have a `me.scss` sass file in your `src`
directory and you want to generate an `assets/compiled.css`
file in your `dist` directory:

    var compileSass = require('broccoli-sass');
    var appCss = compileSass(['src'], 'me.scss', 'assets/compiled.css');
    module.exports = appCss;

Then run broccoli and tell it the root directory for your output:

    broccoli build dist
    
Now you should have the file `dist/assets/compiled.css`...

***NOTE***: broccoli build creates a 'tmp' folder, so you can't
use the directory of your `brocfile.js` (or a parent directory)
as an input or the compiler will go into an infinite loop trying
to process its own output.

# Tag List

To switch, just `git checkout <tag>`

**simple** - just compile one sass file (and an import) into one css file

### Links

[https://github.com/broccolijs/broccoli-sample-app/blob/master/Brocfile.js](https://github.com/broccolijs/broccoli-sample-app/blob/master/Brocfile.js)
