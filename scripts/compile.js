const fs = require('fs-extra');
const html = require('./compile/html');
const css = require('./compile/css');
const javascript = require('./compile/javascript');
const assets = require('./compile/assets');
const preview = require('./preview/preview');
const remote = require('./remote');
const inquirer = require('inquirer');
const pathFinder = require('./utilities/pathFinder');

const dest = process.argv[2] === 'remote' ? 'remote' : 'local';

if (!fs.existsSync('.build')) {
  fs.mkdirSync('.build');
} else {
  fs.emptyDirSync('.build');
}

function compileGraphic(graphicName) {
  if (graphicName.indexOf(' ') >= 0) {
    console.log('A space was found in', graphicName, 'please rename without spaces');
    return false;
  } else if(!fs.statSync(`src/${graphicName}`).isDirectory()) {
    console.log('Folder for', graphicName, 'was not found');
    return false;
  }

  const manifest = new Object;

  let graphic = {
    name: graphicName,
    version: new Date().getTime(),
    dest: dest
  }

  graphic.path = pathFinder.get(dest, graphic);

  fs.mkdirSync(`.build/${graphic.name}`);

  manifest.html = html.render(graphic);
  manifest.css = css.renderAll(graphic);
  manifest.js = javascript.renderAll(graphic);

  assets.init(graphic);
  fs.writeFileSync(`.build/${graphic.name}/manifest.json`, JSON.stringify(manifest, null, 2));

  return graphic;
}

let graphics = fs.readdirSync('src/', { withFileTypes: true})
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(graphics);

if (dest === 'remote') {
  let answering = true;
  graphics.unshift('All Graphics');
  inquirer.prompt([{
    type: 'rawlist',
    name: 'graphics',
    message: 'Select a Graphic to Deploy',
    choices: graphics
  }]).then(answers => {
    if (answers.graphics === 'All Graphics') {
      graphics = fs.readdirSync('src/');
    } else {
      graphics = [ answers.graphics ]
    }
    answering = false;
  }).catch(error => {
    console.log(error);
  });

  require('deasync').loopWhile(function(){return answering;});
}

graphics.forEach((graphic, i) => {
  graphics[i] = compileGraphic(graphic);
});

preview.init();

if (dest === 'remote') {
  graphics = graphics.filter(Boolean);

  graphics.forEach(graphic => {
    remote.deploy(graphic);
  });
}