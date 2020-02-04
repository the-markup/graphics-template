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
    browserSync.reload();
  }
});

watch('src', { recursive: true }, function(event, file) {
  const fileExt = file.substring(file.lastIndexOf('.') + 1);
  const isAssets = file.includes('/assets/');
  const isData = file.includes('/data/');

  const graphic = {
    name: file.replace('src/', '').split('/')[0]
  }

  if (isAssets) {
    assets.init(graphic);
  } else if (isData || fileExt === 'html' || fileExt === 'svg') {
    html.render(graphic);
  } else if (fileExt === 'scss') {
    css.renderAll(graphic);
  } else if (fileExt === 'js') {
    javascript.renderAll(graphic);
  } else {
    console.log('non-watchable file extension changed :' + fileExt);
  }

  preview.init();
});
