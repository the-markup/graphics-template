const logger = require('../utilities/logger');
const glob = require('glob');
const webpack = require('webpack');

module.exports = {
  renderAll(graphic) {
    const paths = glob.sync(`src/${graphic.name}/javascript/*.js`);
    const manifest = new Array();

    paths.forEach(path => {
      this.render(path, graphic);
      manifest.push(path.replace(`src/${graphic.name}/javascript/`, ''));
    });

    return manifest;
  },

  render(path, graphic) {
    logger.log('js', 'compiling ' + path);
    let done = false;

    const compiler = webpack({
      mode: graphic.dest == 'remote' ? 'production' : 'development',
      entry: __dirname.replace('scripts/compile', '') + path,
      output: {
        path: __dirname.replace('scripts/compile', '') + '.build/' + graphic.name,
        filename: path.replace(`src/${graphic.name}/javascript/`, '')
      },
      module: {
        rules: [
          {
            test: /\.handlebars$/,
            loader: 'handlebars-loader'
          }
        ]
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