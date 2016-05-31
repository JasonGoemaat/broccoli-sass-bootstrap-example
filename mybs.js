// Altered from broccoli/lib/server to use browsersync

//var Watcher = require('broccoli/lib/watcher')
//var Watcher = require('./lib/watcher')
//var Watcher = require('broccoli-sane-watcher');
var Watcher = require('./lib/broccoli-sane-watcher');
var middleware = require('broccoli/lib/middleware')
var browserSync = require('browser-sync');
var broccoli = require('broccoli');

function serve (builder, options) {
  options = options || {}
  var server = {}

  console.log('Serving on http://' + options.host + ':' + options.port + '\n')

  server.watcher = options.watcher || new Watcher(builder, {verbose: true})

  server.browserSync = browserSync.create("mybs");
  server.browserSync.init({
    port: 5001,
    middleware: [middleware(server.watcher)]
  });


  // We register these so the 'exit' handler removing temp dirs is called
  function cleanupAndExit() {
    builder.cleanup().catch(function(err) {
      console.error('Cleanup error:')
      console.error(err && err.stack ? err.stack : err)
    }).finally(function() {
      process.exit(1)
    })
  }

  process.on('SIGINT', cleanupAndExit)
  process.on('SIGTERM', cleanupAndExit)

  server.watcher.on('change', function(results) {
    console.log('Built - ' + Math.round(results.totalTime / 1e6) + ' ms @ ' + new Date().toString())
    server.browserSync.reload();
  })

  server.watcher.on('error', function(err) {
    console.log('Built with error:')
    // Should also show file and line/col if present; see cli.js
    if (err.file) {
      console.log('File: ' + err.file)
    }
    console.log(err.stack)
    console.log('')
  })

  return server
}

var builder = new broccoli.Builder(broccoli.loadBrocfile());
console.log('buider:', builder);
serve(builder, {});