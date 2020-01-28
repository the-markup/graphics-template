const fs = require('fs-extra');
const glob = require('glob');
const html = require('./compile/html');
const css = require('./compile/css');
const assets = require('./compile/assets');
const javascript = require('./compile/javascript');
const logger = require('./utilities/logger');
const manifest = new Object;

if (!fs.existsSync('.build')) {
  fs.mkdirSync('.build');
} else {
  fs.emptyDirSync('.build');
}

logger.log('html', 'compiling');
html.render('src/templates/index.html');
manifest.html = 'index.html';
logger.log('html', 'finished');

const cssPaths = glob.sync('src/sass/*.scss');

cssPaths.forEach(path => {
  logger.log('css', 'compiling ' + path);

  css.render(path);
  if (!manifest.css) {
    manifest.css = new Array();
  }
  manifest.css.push(path.replace('src/sass/', '').replace('.scss', '.css'));

  logger.log('css', 'finished ' + path);
});

const javascriptPaths = glob.sync('src/javascript/*.js');

javascriptPaths.forEach(path => {
  logger.log('js', 'compiling ' + path);

  javascript.render(path);
  if (!manifest.js) {
    manifest.js = new Array();
  }
  manifest.js.push(path.replace('src/javascript/', ''));

  logger.log('js', 'finished ' + path);
})

logger.log('assets', 'transferring');
assets.init();
logger.log('assets', 'finished');

fs.writeFileSync('.build/manifest.json', JSON.stringify(manifest, null, 2));
logger.log('json', 'writing manifest file');

// run clean up if a file is removed