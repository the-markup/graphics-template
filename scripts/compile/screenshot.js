const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const logger = require('../utilities/logger');

module.exports = {
  take(graphic) {
    let isDone = false;
    logger.log('fallback', 'Taking screenshot...');

    (async () => {
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      const html = fs.readFileSync('.build/index.html', 'utf8');
      await page.setContent(html);

      let el = await page.$(`.graphics--${graphic.name} .graphics__content`);
      let image = await el.screenshot();

      fs.writeFileSync('./.build/' + graphic.name + '/fallback.png', image);

      await page.close();
      await browser.close();

      isDone = true;
    })();

    require('deasync').loopWhile(function(){return !isDone;});
    logger.log('fallback', 'Screenshot of graphic saved');
  }
}