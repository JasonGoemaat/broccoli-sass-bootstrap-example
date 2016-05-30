# **typescript_simple**

## Compiling simple typescript file

***NOTE*** I added a script, `b.sh` that removed the `dist` directory
since the `broccoli build dist` command requires it, does the build,
and lists the contents of the `dist` directory after:

    rm -rf dist && broccoli build dist && dir dist

We're going to cheat a bit.  The typescript compilers I've seen on npm
(broccoli-typescript, broccoli-typescript-compiler) aren't great.  In
the first instance it only supports typescript 0.9. So I'm going to copy
[the one](https://github.com/angular/angular-cli/blob/master/lib/broccoli/broccoli-typescript.js)
from [`angular-cli`](https://github.com/angular/angular-cli)
and put `broccoli-typescript.js` in a `lib` directory to use
in our `brocfile.js`.

That requires a few node modules to be installed:

    npm install --save-dev typescript fs-extra

So let's create a simple test, just create a `src/app/index.ts`
file:

    const state = 'running';
    console.log(`Typescript is ${state}!`);
    
And add a script tag in `index.html` to load the resulting
javascript file:

    <script src="app/index.js"></script>

Now in our `brocfile.js` we require that library file we downloaded:

    var compileTypescript = require('./lib/broccoli-typescript');
    
And the code to compile:

    // https://www.npmjs.com/package/broccoli-typescript
    var ts = funnel('src', {
        include: ['app/**/*.ts', 'tsconfig.json', 'system.config.ts']
    });
    var js = new compileTypescript(ts, 'tsconfig.json', {});

So first this creates a tree of the files that the compiler will see.
This includes any `.ts` files in our `app` folder and two files from
the root (src): `tsconfig.json`.  We then create a new `compileTypescript`
object and pass that tree, the location of the `tsconfig.json` (in the 
root of the `ts` tree here), and an options object.

Finally we need to merge the new `js` tree with the other trees to the
tree we export:

    module.exports = mergeTrees([appCss, index_html, js]);

# typescript_dependencies

So let's build an actual angular application.  This will get a little
complicated.  We need to install a few node modules outside angular:

    npm install --save-dev es6-shim zone.js rxjs@5.0.0-beta.6 systemjs reflect-metadata

And some angular ones:

    npm install --save-dev @angular/core @angular/common @angular/compiler
    npm install --save-dev @angular/platform-browser
    npm install --save-dev @angular/platform-browser-dynamic

Now we will need to copy some files from those places.  We are going to put
our javascript in the `dist/vendor` folder.

    // funnel individual js files we need from node modules to vendors
    var result = mergeTrees([appCss, index_html, bootstrapFonts, js]);
    var individualJs = mergeTrees([
        funnel('node_modules/es6-shim', { destDir: 'vendor', include: ['es6-shim.js'] }),
        funnel('node_modules/systemjs/dist', { destDir: 'vendor', include: ['system.js', 'system-polyfill.js'] }),
        funnel('node_modules/zone.js/dist', { destDir: 'vendor', include: ['zone.min.js'] }),
        funnel('node_modules/reflect-metadata', { destDir: 'vendor', include: ['Reflect.js'] }),
    ]);
    result = mergeTrees([result, individualJs]);
    
Now change `src/index.html` to load the libraries, and use SystemJS to import
our generated javascript file instead of loading it in a script tag:

    <!-- dependency libraries -->
    <script src="vendor/es6-shim.js"></script>
    <script src="vendor/Reflect.js"></script>
    <script src="vendor/system.js"></script>
    <script src="vendor/zone.min.js"></script>
    <script type="text/javascript">
        System.import('app/index.js');
    </script>

If you do `broccoli serve` and go to http://localhost:4200, you should see the
page with the bootstrap theme and a glyph icon, and the message from index.ts
in the developer console.

I'd rather use `lite-server` so I created a `s.sh` script that runs
`lite-server` and another script I copied [from github]() that watches and
rebuilds when the source files change.


`broccoli build dist --watch` to rebuild when we make changes
to the source, and `lite-server` automatically reloads in your browser when
it detects a file has changed.  I added a `bs-config.json` configuration
file for lite-server as well to tell it to serve files in the `dist` directory.

If you want to use it, you'll need some more modules:

    npm install --save-dev cli-color broccoli-sane-watcher ncp
    
