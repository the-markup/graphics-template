const handlebars = require('handlebars');
const fs = require('fs-extra');

module.exports = {
  init() {
    let data = new Object;
    const graphics = fs.readdirSync('.build');

    graphics.forEach(graphic => {
      if(fs.statSync(`.build/${graphic}`).isDirectory()) {
        data[graphic] = this.graphicData(graphic);
      }
    });

    const articleTemplate = fs.readFileSync('./scripts/preview/article.html', 'utf8');
    const template = handlebars.compile(articleTemplate, data);
    fs.writeFileSync('.build/preview.html', template(data));
  },

  graphicData(name) {
    // ToDo: Get config.json if exists

    const manifest = require(`../../.build/${name}/manifest.json`);
    let graphic = new Object;
    graphic.html = fs.readFileSync(`.build/${name}/index.html`, 'utf8');

    graphic.css = new Array;
    manifest.css.forEach(style => {
      graphic.css.push(fs.readFileSync(`.build/${name}/${style}`, 'utf8'));
    });

    graphic.js = new Array;
    manifest.js.forEach(script => {
      graphic.js.push(fs.readFileSync(`.build/${name}/${script}`, 'utf8'));
    });

    return graphic;
  }
}