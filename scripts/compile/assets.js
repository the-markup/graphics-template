const fs = require('fs-extra');
const logger = require('../utilities/logger');

module.exports = {
  init() {
    logger.log('assets', 'transferring');

    if (!fs.existsSync('.build/assets')) {
      fs.mkdirSync('.build/assets');
    } else {
      fs.emptyDirSync('.build/assets');
    }

    fs.copySync('src/assets', '.build/assets');

    logger.log('assets', 'finished')
  }
}