const handlebars = require('handlebars');
const fs = require('fs-extra');
const glob = require('glob');
const logger = require('../utilities/logger');
const decache = require('decache');

module.exports = {
  render(graphic) {
    logger.log('html', `compiling src/${graphic.name}/index.html`);

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

    logger.log('html', `finished src/${graphic.name}/index.html`);

    return 'index.html';
  },

  iframe(graphic, manifest) {
    logger.log('html', `compiling src/${graphic.name}/iframe.html`);

    const html = fs.readFileSync(`.build/${graphic.name}/index.html`, 'utf8');
    var css = '';
    var js = '';

    for (let file of manifest.css) {
      css += fs.readFileSync(`.build/${graphic.name}/${file}`, 'utf8') + "\n";
    }
    for (let file of manifest.js) {
      js += fs.readFileSync(`.build/${graphic.name}/${file}`, 'utf8') + "\n";
    }

    const iframe = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${graphic.name}</title>
  <link rel="stylesheet" href="https://mrkp-static-production.themarkup.org/static/dist/main.d075b35f.css">
</head>
<body>
  <div id="${graphic.name}" class="graphics graphics--${graphic.name}">
    <div class="graphics__content">
      ${html}
    </div>
    <style>
    ${css}
    </style>
    <script>
    ${js}
    </script>
</body>
</html>`;
    fs.writeFileSync('.build/' + graphic.name + '/iframe.html', iframe);

    logger.log('html', `finished src/${graphic.name}/iframe.html`);

    return 'iframe.html';
  },

  registerHelpers() {
    handlebars.registerHelper('handlise', string => {
      return string.toLowerCase().replace(/ /g, '-');
    })

    handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    })

    handlebars.registerHelper('math', function(lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator]
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
