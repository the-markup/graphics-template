const fs = require('fs-extra');
const logger = require('../utilities/logger');

module.exports = {
  init(graphic) {
    logger.log('assets', 'transferring');

    if (fs.existsSync(`src/${graphic.name}/assets`)) {
      fs.copySync(`src/${graphic.name}/assets`, `.build/${graphic.name}/assets`);
    }

    logger.log('assets', 'finished')
  }
}