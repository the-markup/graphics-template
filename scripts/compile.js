const fs = require('fs-extra');
const html = require('./compile/html');
const css = require('./compile/css');
const javascript = require('./compile/javascript');
const assets = require('./compile/assets');
const preview = require('./preview/preview');
const data = require('../src/data/clean');
const remote = require('./remote');
const pathFinder = require('./utilities/pathFinder');

const manifest = new Object;

const dest = process.argv[2] === 'remote' ? 'remote' : 'local';
const version = new Date().getTime();
const absPath = pathFinder.get(dest, version);

if (!fs.existsSync('.build')) {
  fs.mkdirSync('.build');
} else {
  fs.emptyDirSync('.build');
}

html.render('src/templates/index.html', {path: absPath, data: data.init()});
manifest.html = 'index.html';
manifest.css = css.renderAll();
manifest.js = javascript.renderAll();

assets.init();
fs.writeFileSync('.build/manifest.json', JSON.stringify(manifest, null, 2));
preview.init();

if (dest === 'remote') {
  remote.deploy(version);
}
