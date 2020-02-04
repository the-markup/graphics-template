const fs = require('fs-extra');
const sass = require('node-sass');
const glob = require('glob');
const logger = require('../utilities/logger');
const pathFinder = require('../utilities/pathFinder');

module.exports = {
  renderAll() {
    const paths = glob.sync('src/sass/*.scss');
    const manifest = new Array();

    paths.forEach(path => {
      this.render(path);
      manifest.push(path.replace('src/sass/', '').replace('.scss', '.css'));
    });

    return manifest;
  },

  render(path) {
    logger.log('css', 'compiling... ' + path);
    try {
      const css = sass.renderSync({
        file: path
      }).css.toString('utf8').replace('{{ path }}', pathFinder.get());

      const fileName = path.replace(/^.*[\\\/]/, '').replace('.scss', '');

      fs.writeFileSync(`./.build/${fileName}.css`, css);
      logger.log('css', 'finished ' + path);
    } catch (err) {
      console.log(err);
    }
  }
}