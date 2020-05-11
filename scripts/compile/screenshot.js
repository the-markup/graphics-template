const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const logger = require('../utilities/logger');
const pathFinder = require('../utilities/pathfinder');

module.exports = {
  take(graphic) {
    let isDone = false;
    logger.log('fallback', 'Taking screenshot...');

    (async () => {
      // create browser
      let browser = await puppeteer.launch();
      let page = await browser.newPage();

      // load preview html file
      let html = fs.readFileSync('./.build/index.html', 'utf8');

      // replace paths with local versions
      const regEx = new RegExp(graphic.path, 'g');
      html = html.replace(regEx, pathFinder.get('local', graphic));

      // load html in browser
      await page.setContent(html);

      // take screenshot
      let el = await page.$(`.graphics--${graphic.name} .graphics__content`);
      let image = await el.screenshot();

      // save screenshot
      fs.writeFileSync('./.build/' + graphic.name + '/fallback.png', image);

      await page.close();
      await browser.close();

      isDone = true;
    })();

    require('deasync').loopWhile(function(){return !isDone;});
    logger.log('fallback', 'Screenshot of graphic saved');
  }
}