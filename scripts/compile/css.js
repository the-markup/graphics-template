const path = require('path');
const fs = require('fs-extra');
const sass = require('sass');
const glob = require('glob');
const logger = require('../utilities/logger');

module.exports = {
  renderAll(graphic) {
    const scssPathsMatch = path.join('src', graphic.name, 'sass', '*scss');
    const paths = glob.sync(scssPathsMatch);
    const manifest = new Array();

    paths.forEach(filepath => {
      this.render(filepath, graphic);
      const sassDir = path.join('src', graphic.name, 'sass', path.sep);
      manifest.push(filepath.replace(sassDir, '').replace('.scss', '.css'));
    });

    return manifest;
  },

  render(filepath, graphic) {
    logger.log('css', 'compiling ' + filepath);
    try {
      const css = sass.compile(filepath).css.toString('utf8').replace(/{{ filepath }}/g, graphic.path);      
      const fileName = path.basename(filepath, '.scss');
      const outputCSSPath = path.join('.', path.sep, '.build', graphic.name, `${fileName}.css`);
      fs.writeFileSync(outputCSSPath, css);
      logger.log('css', 'finished ' + filepath);
    } catch (err) {
      console.log(err);
    }
  }
}
