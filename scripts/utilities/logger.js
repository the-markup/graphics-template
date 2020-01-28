const chalk = require('chalk');

module.exports = {
  log(type, notice) {
    console.log(
      chalk.bgHex('#ff335f').hex('#ffffff')(' ' + type + ' '),
      '\t',
      chalk.blue.bold(notice)
    )
  }
}