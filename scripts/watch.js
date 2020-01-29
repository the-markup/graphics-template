const watch = require('node-watch');
const browserSync = require('browser-sync').create();
const browserSyncReuseTab = require('browser-sync-reuse-tab')(browserSync);

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
    browserSync.reload('*.css');
  }
});

watch('src', { recursive: true }, function(event, file) {
  var fileExt = file.substring(file.lastIndexOf('.') + 1);
  var isAssets = file.includes('/assets/');
  var isData = file.includes('/data/');

  if (isAssets) {
    assets.init();
  } else if (isData || fileExt === 'html' || fileExt === 'svg') {
    html.render('src/templates/index.html', {path: 'http://locahost:5000', data: data.init()});
  } else if (fileExt === 'scss') {
    css.render(file);
  } else if (fileExt === 'js') {
    javascript.render(file);
  } else {
    console.log('non-watchable file extension changed :' + fileExt);
  }

  preview.init();
});