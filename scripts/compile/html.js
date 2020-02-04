const handlebars = require('handlebars');
const fs = require('fs-extra');
const glob = require('glob');
const logger = require('../utilities/logger');

module.exports = {
  render(path, data) {
    logger.log('html', 'compiling...');
    this.registerHelpers();
    this.registerPartials();

    const html = fs.readFileSync(path, 'utf8');
    const template = handlebars.compile(html);
    fs.writeFileSync('.build/index.html', template(data));

    logger.log('html', 'finished');
  },

  registerHelpers() {
    handlebars.registerHelper('handlise', string => {
      return string.toLowerCase().replace(/ /g, '-');
    })
  },

  registerPartials() {
    let partials = glob.sync('src/templates/**/*.*');
    partials = partials.concat(glob.sync('.exports/*.*'));

    partials.forEach(partial => {
      const name = partial.replace('src/templates/', '').replace('.exports', 'exports').split('.')[0];
      const template = fs.readFileSync(partial, 'utf8');

      handlebars.registerPartial(name, template);
    });
  }
}