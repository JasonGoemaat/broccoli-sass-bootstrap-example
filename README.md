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

# **bootstrap** 

## Importing from node module `bootstrap-sass`

Now install the node module `bootstrap-sass`:

    npm install --save-dev bootstrap-sass

This is the `me.scss` file now:

    @import 'my-variables';

    body {
        background-color: $body-bg;
    }

    h1 {
        color: $text-color;    
    }

Let's get rid of our custom `body` and `h1` styles and import bootstrap,
that will make use of the variables we have defined in `my-variables.scss`:

    @import 'my-variables';
    @import 'node_modules/bootstrap-sass/assets/stylesheets/_bootstrap';

That is so cool!  Broccoli will use the location of `brocfile.js` as a 
reference for where to import files, as well as any path in the array
you pass as the first argument to the compile method:

    // compileSass([dirs...], 'input file', 'output file')
    var appCss = compileSass(['src'], 'me.scss', 'assets/compiled.css');

I'm getting tired of the ugly colors in my variables, so let's pick a
theme from [bootswatch](https://bootswatch.com/).  They have a node
package you can install:

    npm install --save-dev bootswatch
    
And we can change our scss file to use one of their themes, importing 
the variables *before* bootstrap proper and another file with other
changes *after*:

    // import variables _before_ bootstrap proper:
    @import 'node_modules/bootswatch/darkly/_variables.scss';

    // now bootstrap itself which will use those variables:
    @import 'node_modules/bootstrap-sass/assets/stylesheets/_bootstrap';

    // now overrides for anything bootstrap did that we want to changes:
    @import 'node_modules/bootswatch/darkly/_bootswatch.scss';

You'll notice that glyphicons aren't working...  Bootstrap uses the
`$icon-font-path` variable to tell the css where the files are.  That
defaults to `../fonts/bootstrap`, so we would have to copy those
fonts to our output directory, either in the appropriate location 
relative to `compiled.css`, or we could change the variable...

# Tag List

To switch, just `git checkout <tag>`

**simple** - just compile one sass file (and an import) into one css file

**bootstrap** - Importing from node module `bootstrap-sass`

### Links

[https://github.com/broccolijs/broccoli-sample-app/blob/master/Brocfile.js](https://github.com/broccolijs/broccoli-sample-app/blob/master/Brocfile.js)

[https://hacks.mozilla.org/2015/06/es6-in-depth-babel-and-broccoli/](https://hacks.mozilla.org/2015/06/es6-in-depth-babel-and-broccoli/)

[https://github.com/broccolijs/broccoli](https://github.com/broccolijs/broccoli)
