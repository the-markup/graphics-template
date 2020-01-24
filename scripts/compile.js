const fs = require('fs-extra');
const glob = require('glob-fs')({ gitignore: true });
const html = require('./compile/html.js');
const manifest = new Object;

if (!fs.existsSync('.build')) {
  fs.mkdirSync('.build');
}

html.render('src/templates/index.html');
manifest.html = 'index.html';


// const htmlPaths = glob.readdirSync('src/templates/*.html');

// htmlPaths.forEach(path => {
//     html.render(path);
//     if (!manifest.html) {

//     }
//     // add to manifest
// });


// spit out manifest

fs.writeFileSync('.build/manifest.json', JSON.stringify(manifest, null, 2));