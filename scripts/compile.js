const fs = require('fs-extra');
const html = require('./compile/html');
const css = require('./compile/css');
const javascript = require('./compile/javascript');
const assets = require('./compile/assets');
const preview = require('./preview/preview');
const remote = require('./remote');
const pathFinder = require('./utilities/pathFinder');

const dest = process.argv[2] === 'remote' ? 'remote' : 'local';

if (!fs.existsSync('.build')) {
  fs.mkdirSync('.build');
} else {
  fs.emptyDirSync('.build');
}

function compileGraphic(graphicName) {
  const manifest = new Object;

  let graphic = {
    name: graphicName,
    version: new Date().getTime()
  }

  graphic.path = pathFinder.get(dest, graphic);

  fs.mkdirSync(`.build/${graphic.name}`);

  manifest.html = html.render(graphic);
  manifest.css = css.renderAll(graphic);
  manifest.js = javascript.renderAll(graphic);

  assets.init(graphic);
  fs.writeFileSync(`.build/${graphic.name}/manifest.json`, JSON.stringify(manifest, null, 2));
}

const graphics = fs.readdirSync('src/');

graphics.forEach(graphic => {
  if(fs.statSync(`src/${graphic}`).isDirectory()) {
    compileGraphic(graphic);
  }
});

preview.init();

if (dest === 'remote') {
  remote.deploy(version);
}