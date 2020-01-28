const fs = require('fs-extra');
const sass = require('node-sass');
const logger = require('../utilities/logger');

module.exports = {
  render(path) {
    logger.log('css', 'compiling... ' + path);
    try {
      const css = sass.renderSync({
        file: path
      }).css.toString('utf8');

      const fileName = path.replace(/^.*[\\\/]/, '').replace('.scss', '');

      fs.writeFileSync(`.build/${fileName}.css`, css);
      logger.log('css', 'finished ' + path);
    } catch (err) {
      console.log(err);
    }
  }
}