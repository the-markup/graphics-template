const fs = require('fs-extra');
const path = require('path');
const logger = require('../utilities/logger');

module.exports = {
  init(graphic) {
    logger.log('assets', 'transferring');

    const assetsDir = path.join('src', graphic.name, 'assets');
    if (fs.existsSync(assetsDir)) {
      logger.log('assets', 'copying assets');
      const assetsBuildDir = path.join('.build', graphic.name, 'assets');
      fs.copySync(assetsDir, assetsBuildDir);
    }

    if (graphic.config.fonts && fs.existsSync(graphic.config.fonts)) {
      logger.log('assets', 'copying fonts');
      const fontsBuildDir = path.join('.build', graphic.name, 'fonts');
      fs.copySync(graphic.config.fonts, fontsBuildDir);
    }

    logger.log('assets', 'finished')
  }
}
