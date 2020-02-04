const watch = require('node-watch');
const browserSync = require('browser-sync').create();
const browserSyncReuseTab = require('browser-sync-reuse-tab')(browserSync);
const decache = require('decache');

let data = require('../src/data/clean');
const html = require('./compile/html');
const css = require('./compile/css');
const javascript = require('./compile/javascript');
const assets = require('./compile/assets');
const preview = require('./preview/preview');

browserSync.init({
  server: './.build',
  port: 5000,
  open: false,
  startPath: '/preview.html'
}, browserSyncReuseTab);

browserSync.watch('./.build/*.*', (event, file) => {
  if (event === 'change') {
    browserSync.reload();
  }
});

watch('src', { recursive: true }, function(event, file) {
  var fileExt = file.substring(file.lastIndexOf('.') + 1);
  var isAssets = file.includes('/assets/');
  var isData = file.includes('/data/');

  if (isAssets) {
    assets.init();
  } else if (isData || fileExt === 'html' || fileExt === 'svg') {
    decache('../src/data/clean');
    data = require('../src/data/clean');
    html.render('src/templates/index.html', {path: 'http://locahost:5000', data: data.init()});
  } else if (fileExt === 'scss') {
    css.renderAll();
  } else if (fileExt === 'js') {
    javascript.renderAll();
  } else {
    console.log('non-watchable file extension changed :' + fileExt);
  }

  preview.init();
});
