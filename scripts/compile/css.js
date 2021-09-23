const fs = require('fs-extra');
const sass = require('sass');
const glob = require('glob');
const logger = require('../utilities/logger');

module.exports = {
  renderAll(graphic) {
    const paths = glob.sync(`src/${graphic.name}/sass/*.scss`);
    const manifest = new Array();

    paths.forEach(path => {
      this.render(path, graphic);
      manifest.push(path.replace(`src/${graphic.name}/sass/`, '').replace('.scss', '.css'));
    });

    return manifest;
  },

  render(path, graphic) {
    logger.log('css', 'compiling... ' + path);
    try {
      const css = sass.renderSync({
        file: path
      }).css.toString('utf8').replace(/{{ path }}/g, graphic.path);

      const fileName = path.replace(/^.*[\\\/]/, '').replace('.scss', '');

      fs.writeFileSync(`./.build/${graphic.name}/${fileName}.css`, css);
      logger.log('css', 'finished ' + path);
    } catch (err) {
      console.log(err);
    }
  }
}