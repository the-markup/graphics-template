const fs = require('fs-extra');
const logger = require('../utilities/logger');
const webpack = require('webpack');

module.exports = {
  render(path) {
    logger.log('js', 'compiling ' + path);

    const compiler = webpack({
      mode: 'production',
      entry: __dirname.replace('scripts/compile', '') + path,
      output: {
        path: __dirname.replace('scripts/compile', '') + '.build',
        filename: path.replace('src/javascript/', '')
      }
    });

    compiler.run((err, stats) => {
      logger.log('js', 'really finished ' + path);
    });

    logger.log('js', 'finished ' + path);
  }
}