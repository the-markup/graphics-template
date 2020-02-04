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
  const version = new Date().getTime();

  const graphic = {
    name: graphicName,
    path: pathFinder.get(dest, version),
    version: version
  }

  manifest.html = html.render(graphic);
  manifest.css = css.renderAll(graphic);
  manifest.js = javascript.renderAll(graphic);

  assets.init(graphic);
  fs.writeFileSync(`.build/${graphic.name}/manifest.json`, JSON.stringify(manifest, null, 2));
}

compileGraphic('graphic-1');
compileGraphic('graphic-2');
preview.init();

if (dest === 'remote') {
  remote.deploy(version);
}