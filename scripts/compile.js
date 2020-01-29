const fs = require('fs-extra');
const glob = require('glob');
const html = require('./compile/html');
const css = require('./compile/css');
const javascript = require('./compile/javascript');
const assets = require('./compile/assets');
const preview = require('./preview/preview');
const data = require('../src/data/clean');
const remote = require('./remote');
const config = require('../config.json');
const manifest = new Object;

const dest = process.argv[2] === 'remote' ? 'remote' : 'local';
const version = new Date().getTime();
let path;

if (dest === 'remote') {
  path = `https://mrkp-wp-uploads-qednews-com-production.s3.amazonaws.com/graphics/${config.name}/${version}/`;
} else {
  path = 'http://localhost:5000/';
}

if (!fs.existsSync('.build')) {
  fs.mkdirSync('.build');
} else {
  fs.emptyDirSync('.build');
}

html.render('src/templates/index.html', {path: path, data: data.init()});
manifest.html = 'index.html';

const cssPaths = glob.sync('src/sass/*.scss');

cssPaths.forEach(path => {
  css.render(path);
  if (!manifest.css) {
    manifest.css = new Array();
  }
  manifest.css.push(path.replace('src/sass/', '').replace('.scss', '.css'));
});

const javascriptPaths = glob.sync('src/javascript/*.js');

javascriptPaths.forEach(path => {
  javascript.render(path);
  if (!manifest.js) {
    manifest.js = new Array();
  }
  manifest.js.push(path.replace('src/javascript/', ''));
})

assets.init();
fs.writeFileSync('.build/manifest.json', JSON.stringify(manifest, null, 2));
preview.init();

if (dest === 'remote') {
  remote.deploy(version);
}
