const handlebars = require('handlebars');
const fs = require('fs-extra');
const glob = require('glob');
const logger = require('../utilities/logger');
const decache = require('decache');

module.exports = {
  render(graphic) {
    logger.log('html', 'compiling...');

    let data;

    if (fs.existsSync('./src/' + graphic.name + '/data/data.js')) {
      decache('../../src/' + graphic.name + '/data/data.js');
      data = require('../../src/' + graphic.name + '/data/data.js').init();
    } else {
      data = new Object;
    }

    this.registerHelpers();
    this.registerPartials(graphic.name);

    const html = fs.readFileSync('src/' + graphic.name + '/templates/index.html', 'utf8');
    const template = handlebars.compile(html);
    fs.writeFileSync('.build/' + graphic.name + '/index.html', template({ path: graphic.path, data: data }));

    logger.log('html', 'finished');

    return 'index.html';
  },

  registerHelpers() {
    handlebars.registerHelper('handlise', string => {
      return string.toLowerCase().replace(/ /g, '-');
    });

    handlebars.registerHelper('if_eq', function(a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });
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