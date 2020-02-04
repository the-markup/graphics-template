const fs = require('fs-extra');
const sass = require('node-sass');
const glob = require('glob');
const logger = require('../utilities/logger');
const pathFinder = require('../utilities/pathFinder');

module.exports = {
  renderAll(graphic) {
    const paths = glob.sync(`src/${graphic.name}/sass/*.scss`);
    const manifest = new Array();

    paths.forEach(path => {
      this.render(path, graphic.name);
      manifest.push(path.replace(`src/${graphic.name}/sass/`, '').replace('.scss', '.css'));
    });

    return manifest;
  },

  render(path, graphicName) {
    logger.log('css', 'compiling... ' + path);
    try {
      const css = sass.renderSync({
        file: path
      }).css.toString('utf8').replace('{{ path }}', pathFinder.get());

      const fileName = path.replace(/^.*[\\\/]/, '').replace('.scss', '');

      fs.writeFileSync(`./.build/${graphicName}/${fileName}.css`, css);
      logger.log('css', 'finished ' + path);
    } catch (err) {
      console.log(err);
    }
  }
}