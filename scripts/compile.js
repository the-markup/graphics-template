const fs = require('fs-extra');
const glob = require('glob-fs')({ gitignore: true });
const html = require('./compile/html');
const css = require('./compile/css');
const javascript = require('./compile/javascript');
const manifest = new Object;

if (!fs.existsSync('.build')) {
  fs.mkdirSync('.build');
}

html.render('src/templates/index.html');
manifest.html = 'index.html';

const cssPaths = glob.readdirSync('src/sass/*.scss');

cssPaths.forEach(path => {
  css.render(path);
  if (!manifest.css) {
    manifest.css = new Array();
  }
  manifest.css.push(path.replace('src/sass/', '').replace('.scss', '.css'));
});

const javascriptPaths = glob.readdirSync('src/javascript/*.js');

javascriptPaths.forEach(path => {
  javascript.render(path);
  if (!manifest.js) {
    manifest.js = new Array();
  }
  manifest.css.push(path.replace('src/js/', ''));
})

fs.writeFileSync('.build/manifest.json', JSON.stringify(manifest, null, 2));

// run clean up if a file is removed