Check out the tag list at the bottom, with the repository in
varying states.  To see the file in action, `npm install -g lite-server`
and run `lite-server` to serve up `index.html`.

Check out the `typescript.md` file for an example with typescript.

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

# **copying**

## Copying files, merging output

Now we will change our `brocfile.js` to do some file copying to
get those font files over and to copy our index.html to the output
directory.  Broccoli has a 'funnel' plugin for just this purpose,
and we will need to merge those files using the 'merge-trees' plugin,
so let's install them:

    npm install --save-dev broccoli-funnel broccoli-merge-trees

First, let's change `brocfile.js` to copy `index.html` to the output
directory.  We need to require those plugins:

    var funnel = require('broccoli-funnel');
    var mergeTrees = require('broccoli-merge-trees');

For a detailed desription of how to use 'funnel', check 
[the funnel docs](https://github.com/broccolijs/broccoli-funnel).
First, move the `index.html` file into the `src` directory.  You
can use other directories, but not the directory where `brocfile.js`
is located because broccoli creates a `tmp` directory there
that would also be included in searching for files.

Now at the bottom of `brocfile.js` add these lines.  It's ok to
leave the sass code there, this `module.exports` will override
the sass one:

    var index_html = funnel('src', {
        include: ['index.html']
    });

    module.exports = index_html;

Now if you did `broccoli build dist` it would move your `index.html` 
file to the dist directory.  But we can do better.  Run `broccoli serve`
and it will serve it's output on port 4200.  No more need for `lite-server`
unless you need the auto-reload.  It will be watching for changes
to its inputs and auto-rebuilding when it detects a change is made.

The last thing we need to do is change the link to the stylesheet
in 'index.html' since we moved it into the root of the output, what
will be the 'dist' folder if you run `broccoli build dist`.  You can
specify an output child path with funnel of course, but we want
`index.html` in the root.

    <link rel="stylesheet" href="assets/compiled.css">

# **bootstrap_assets**

## Copy bootstrap fonts

The bootstrap fonts are in `node_modules/bootstrap-sass/assets/fonts/bootstrap`.
What I'm going to do is copy them to `dist/assets/fonts`.  That will just
be creating a funnel to take those files as input and specifying the
directory to output them in:

    var bootstrapFonts = funnel('node_modules/bootstrap-sass/assets/fonts/bootstrap', {
        include: ['*.@(ttf|woff|woff2)'],
        destDir: 'assets/fonts'
    });

The glob pattern `'*.@(ttf|woff|woff2)'` matches exactly one of those
extensions, so it will copy only those three files that my browser 
requests when they're missing and ignore the other font files (eot, svg).

Not I just need to override the `$icon-font-path` variable bootstrap uses
to find the fonts in `me.scss` before importing bootstrap:

    $icon-font-path: 'fonts';

# Tag List

To switch, just `git checkout <tag>`

**simple** - just compile one sass file (and an import) into one css file

**bootstrap** - Importing from node module `bootstrap-sass`

**copying** - Copying files, merging output

**bootstrap_assets** - Copy bootstrap fonts, images

**typescript_simple** - Simple compile of one typescript file

### Links

[https://github.com/broccolijs/broccoli-sample-app/blob/master/Brocfile.js](https://github.com/broccolijs/broccoli-sample-app/blob/master/Brocfile.js)

[https://hacks.mozilla.org/2015/06/es6-in-depth-babel-and-broccoli/](https://hacks.mozilla.org/2015/06/es6-in-depth-babel-and-broccoli/)

[https://github.com/broccolijs/broccoli](https://github.com/broccolijs/broccoli)
