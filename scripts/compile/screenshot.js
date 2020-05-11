const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const logger = require('../utilities/logger');

module.exports = {
  take(graphic) {
    logger.log('fallback', 'Starting browser...');

    puppeteer.launch().then(browser => {
      browser.newPage().then(page => {
        page.goto('http://localhost:5000/index.html').then(response => {
          page.$('.graphics--' + graphic.name + ' .graphics__content').then(graphicEl => {
            graphicEl.screenshot().then(image => {
              fs.writeFileSync('./.build/' + graphic.name + '/fallback.png', image);
              logger.log('fallback', 'Screenshot of graphic saved');
              browser.close();
              return 'fallback.png';
            });
          })
        })
      })
    });
  }
}