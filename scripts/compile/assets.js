const fs = require('fs-extra');
const logger = require('../utilities/logger');

module.exports = {
  init(graphic) {
    logger.log('assets', 'transferring');

    if (fs.existsSync(`src/${graphic.name}/assets`)) {
      logger.log('assets', 'copying assets');
      fs.copySync(`src/${graphic.name}/assets`, `.build/${graphic.name}/assets`);
    }

    if (graphic.config.fonts && fs.existsSync(graphic.config.fonts)) {
      logger.log('assets', 'copying fonts');
      fs.copySync(graphic.config.fonts, `.build/${graphic.name}/fonts`);
    }

    logger.log('assets', 'finished')
  }
}
