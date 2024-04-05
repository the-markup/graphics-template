const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs-extra');
const glob = require('glob');
const logger = require('../utilities/logger');
const decache = require('decache');

module.exports = {
  render(graphic) {
    const indexPath = path.join('src', graphic.name, 'index.html');
    logger.log('html', `compiling ${indexPath}`);

    let data;
    const dataPath = path.join('.', 'src', graphic.name, 'data', 'data.js');
    if (fs.existsSync(dataPath)) {
      const cacheDataPath = path.join('..', '..', 'src', graphic.name, 'data', 'data.js');
      decache(cacheDataPath);
      data = require(cacheDataPath).init();
    } else {
      data = new Object;
    }

    this.registerHelpers();
    this.registerPartials(graphic.name);

    const html = fs.readFileSync('src/' + graphic.name + '/templates/index.html' , 'utf8');
    const template = handlebars.compile(html);
    fs.writeFileSync('.build/' + graphic.name + '/index.html', template({ path: graphic.path, data: data }));

    logger.log('html', `finished ${indexPath}`);

    return 'index.html';
  },

  iframe(graphic, manifest) {
    const iframePath = path.join('src', graphic.name, 'iframe.html');
    logger.log('html', `compiling ${iframePath}`);

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
    const buildIndexPath = path.join('.build', graphic.name, 'iframe.html');
    fs.writeFileSync(buildIndexPath, iframe);

    logger.log('html', `finished ${iframePath}`);

    return 'iframe.html';
  },

  registerHelpers() {
    handlebars.registerHelper('handlise', string => {
      return string.toLowerCase().replace(/ /g, '-');
    })
  },

  registerPartials(graphicName) {
    const templateMatch = path.join('src', graphicName, 'templates', '**', '*.*');
    const exportsMatch = path.join('.exports', '*.*');
    let partials = glob.sync(templateMatch);
    partials = partials.concat(glob.sync(exportsMatch));

    partials.forEach(partial => {
      const name = partial.replace('src/' + graphicName + '/templates/', '').replace('.exports', 'exports').split('.')[0];
      const template = fs.readFileSync(partial, 'utf8');

      handlebars.registerPartial(name, template);
    });
  }
}
