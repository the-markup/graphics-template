const path = require('path');
const logger = require('../utilities/logger');
const glob = require('glob');
const webpack = require('webpack');

module.exports = {
  renderAll(graphic) {
    const jsMatches = path.join('src', graphic.name, 'javascript', '*.js');
    const paths = glob.sync(jsMatches, {windowsPathsNoEscape:true});
    const manifest = new Array();

    paths.forEach(filepath => {
      this.render(filepath, graphic);
      manifest.push(filepath.replace(`src/${graphic.name}/javascript/`, ''));
    });

    return manifest;
  },

  render(filepath, graphic) {
    logger.log('js', 'compiling ' + filepath);
    let done = false;

    const compileDir = path.join('scripts', 'compile');
    const buildDir = path.join('.build', path.sep);
    
    const compiler = webpack({
      mode: graphic.dest == 'remote' ? 'production' : 'development',
      entry: __dirname.replace(compileDir, '') + filepath,
      output: {
        path: __dirname.replace(compileDir, '') + buildDir + graphic.name,
        filename: filepath.replace(`src/${graphic.name}/javascript/`, '')
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

    logger.log('js', 'finished ' + filepath);
  }
}