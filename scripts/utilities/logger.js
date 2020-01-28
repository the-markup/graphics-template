const chalk = require('chalk');

module.exports = {
  log(type, notice) {
    console.log(
      chalk.bgHex('#ff335f').hex('#ffffff')(' ' + type + ' '),
      this.spacing(type),
      chalk.blue.bold(notice)
    )
  },

  spacing(type) {
    const typeLength = type.length + 2;
    const spacingLength = 12 - typeLength;
    return ' '.repeat(spacingLength);
  }
}