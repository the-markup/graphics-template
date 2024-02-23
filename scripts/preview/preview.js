const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs-extra');

module.exports = {
  init() {
    let data = new Object;
    const graphics = fs.readdirSync('.build');

    graphics.forEach(graphic => {
      let graphicDir = path.join('.build', graphic);
      if(fs.statSync(graphicDir).isDirectory()) {
        data[graphic] = this.graphicData(graphic);
      }
    });

    const articlePath = path.join('.', 'scripts', 'preview', 'article.html');
    const articleTemplate = fs.readFileSync(articlePath, 'utf8');
    const template = handlebars.compile(articleTemplate, data);
    const indexPath = path.join('.build', 'index.html');
    fs.writeFileSync(indexPath, template(data));
  },

  graphicData(name) {
    const manifestPath = path.join('..', '..', '.build', name, 'manifest.json');
    const manifest = require(manifestPath);
    let graphic = new Object;

    graphic.config = new Object;

    const configPath = path.join('src', name, 'config.json');
    if (fs.existsSync(configPath)) {
      graphic.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }

    graphic.config.name = name;

    const indexPath = path.join('.build', name, 'index.html');
    graphic.html = fs.readFileSync(indexPath, 'utf8');

    graphic.css = new Array;
    manifest.css.forEach(style => {
      let cssPath = path.join('.build', name, style);
      graphic.css.push(fs.readFileSync(cssPath, 'utf8'));
    });

    graphic.js = new Array;
    manifest.js.forEach(script => {
      let jsPath = path.join(path.sep, name, script);
      graphic.js.push(jsPath);
    });

    return graphic;
  }
}