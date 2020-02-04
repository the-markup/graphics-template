const handlebars = require('handlebars');
const fs = require('fs-extra');

module.exports = {
  init() {
    const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    const manifest = require('../../.build/manifest.json');
    const articleTemplate = fs.readFileSync('./scripts/preview/article.html', 'utf8');

    let data = new Object;
    data.html = fs.readFileSync('./.build/' + manifest.html, 'utf8');

    data.css = new Array;
    manifest.css.forEach(style => {
      data.css.push(fs.readFileSync('./.build/' + style, 'utf8'));
    });

    data.js = new Array;
    manifest.js.forEach(script => {
      data.js.push('/' + script);
    });

    data.config = config;

    const template = handlebars.compile(articleTemplate, data);
    fs.writeFileSync('.build/preview.html', template(data));
  }
}