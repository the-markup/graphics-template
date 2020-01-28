const logger = require('../utilities/logger');
const deasync = require('deasync');
const webpack = require('webpack');

module.exports = {
  render(path) {
    logger.log('js', 'compiling ' + path);
    let done = false;

    const compiler = webpack({
      mode: 'production',
      entry: __dirname.replace('scripts/compile', '') + path,
      output: {
        path: __dirname.replace('scripts/compile', '') + '.build',
        filename: path.replace('src/javascript/', '')
      }
    });

    compiler.run((err, stats) => {
      if (stats.compilation.errors && stats.compilation.errors.length) {
        console.log(stats.compilation.errors);
      }
      done = true;
    });

    require('deasync').loopWhile(function(){return !done;});

    logger.log('js', 'finished ' + path);
  }
}