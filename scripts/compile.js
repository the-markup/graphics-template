const fs = require('fs-extra');
const path = require('path');
const html = require('./compile/html');
const css = require('./compile/css');
const javascript = require('./compile/javascript');
const assets = require('./compile/assets');
const screenshot = require('./compile/screenshot');
const preview = require('./preview/preview');
const remote = require('./remote');
const inquirer = require('inquirer');
const pathFinder = require('./utilities/pathfinder');
const handler = require('serve-handler');
const http = require('http');
const terminator = require('http-terminator');
const svelte = require('./compile/svelte');

const dest = process.argv[2] === 'remote' ? 'remote' : 'local';

if (!fs.existsSync('.build')) {
  fs.mkdirSync('.build');
} else {
  fs.emptyDirSync('.build');
}

function compileGraphic(graphicName) {
  const graphicFolder = path.join('src', graphicName);

  if (graphicName.indexOf(' ') >= 0) {
    console.log('A space was found in', graphicName, 'please rename without spaces');
    return false;
  } else if (!fs.statSync(graphicFolder).isDirectory()) {
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
  //append config options to check if screenshot must be taken
  graphic.config = new Object;
  const configPath = path.join(graphicFolder, 'config.json');
  if (fs.existsSync(configPath)) {
    graphic.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  const buildDir = path.join('.build', graphic.name);
  fs.mkdirSync(buildDir);

  if (graphic.config.svelte) {
    const result = svelte.render(graphic);
    manifest.js = result.js;
    manifest.html = result.html;
    manifest.css = result.css;
  } else {
    manifest.html = html.render(graphic);
    manifest.css = css.renderAll(graphic);
    manifest.js = javascript.renderAll(graphic);
  }

  manifest.iframe = html.iframe(graphic, manifest);

  if (dest === 'remote') {
    manifest.fallback = 'fallback.png'; // fallback image gets taken once the all graphics are built
  }

  assets.init(graphic);
  const manifestPath = path.join('.build', graphic.name, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  return graphic;
}

const srcDir = path.join('src', path.sep);
let graphics = fs.readdirSync(srcDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

if (process.env.GITHUB_REPOSITORY) {
  graphics = fs.readdirSync(srcDir)
}
else if (dest === 'remote' && graphics.length > 1) {
  let answering = true;
  graphics.unshift('All Graphics');
  inquirer.prompt([{
    type: 'rawlist',
    name: 'graphics',
    message: 'Select a Graphic to Deploy',
    choices: graphics
  }]).then(answers => {
    if (answers.graphics === 'All Graphics') {
      graphics = fs.readdirSync(srcDir);
    } else {
      graphics = [answers.graphics]
    }
    answering = false;
  }).catch(error => {
    console.log(error);
  });

  require('deasync').loopWhile(function () { return answering; });
}

graphics.forEach((graphic, i) => {
  graphics[i] = compileGraphic(graphic);
});

preview.init();
if (dest === 'remote') {
  const deployBuildDir = path.join('.', path.sep, '.build');
  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: deployBuildDir
    });
  });
  server.listen(5001);

  graphics = graphics.filter(Boolean);
  graphics.forEach(async graphic => {
    //check if a screenshot should be taken
    if (graphic.config.auto_screenshot) {
      await screenshot.take(graphic);
    }

    //remove the config options before deploy
    delete graphic.config;

    remote.deploy(graphic);
  });

  const httpTerminator = terminator.createHttpTerminator({ server, });
  httpTerminator.terminate();
}
