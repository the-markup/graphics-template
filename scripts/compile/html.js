const handlebars = require('handlebars');
const fs = require('fs-extra');
const glob = require('glob');
const logger = require('../utilities/logger');

module.exports = {
  render(graphic) {
    logger.log('html', 'compiling...');

    this.registerHelpers();
    this.registerPartials(graphic.name);

    const html = fs.readFileSync('src/' + graphic.name + '/templates/index.html', 'utf8');
    const data = require('../../src/' + graphic.name + '/data/data.js').init();
    const template = handlebars.compile(html);
    fs.writeFileSync('.build/index.html', template({ path: graphic.absPath, data: data }));

    logger.log('html', 'finished');

    return 'index.html';
  },

  registerHelpers() {
    handlebars.registerHelper('handlise', string => {
      return string.toLowerCase().replace(/ /g, '-');
    })
  },

  registerPartials(graphicName) {
    let partials = glob.sync('src/' + graphicName + '/templates/**/*.*');
    partials = partials.concat(glob.sync('.exports/*.*'));

    partials.forEach(partial => {
      const name = partial.replace('src/' + graphicName + '/templates/', '').replace('.exports', 'exports').split('.')[0];
      const template = fs.readFileSync(partial, 'utf8');

      handlebars.registerPartial(name, template);
    });
  }
}