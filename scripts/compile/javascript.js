const logger = require('../utilities/logger');
const glob = require('glob');
const webpack = require('webpack');

module.exports = {
  renderAll(graphicName) {
    const paths = glob.sync('src/' + graphicName + 'javascript/*.js');
    const manifest = new Array();

    paths.forEach(path => {
      this.render(path);
      manifest.push(path.replace('src/' + graphicName + 'javascript/', ''));
    });

    return manifest;
  },

  render(path) {
    logger.log('js', 'compiling ' + path);
    let done = false;

    const compiler = webpack({
      mode: 'production',
      entry: __dirname.replace('scripts/compile', '') + path,
      output: {
        path: __dirname.replace('scripts/compile', '') + '.build',
        filename: path.replace('src/' + graphicName + 'javascript/', '')
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