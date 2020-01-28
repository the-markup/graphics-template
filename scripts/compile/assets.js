const fs = require('fs-extra');

module.exports = {
  init() {
    if (!fs.existsSync('.build/assets')) {
      fs.mkdirSync('.build/assets');
    } else {
      fs.emptyDirSync('.build/assets');
    }

    fs.copySync('src/assets', '.build/assets');
  }
}