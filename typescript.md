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


