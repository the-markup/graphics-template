const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const logger = require('../utilities/logger');
const pathFinder = require('../utilities/pathfinder');

module.exports = {
	async take(graphic) {

		logger.log('fallback', 'Taking screenshot...');

		let browser = await puppeteer.launch();
		let page = await browser.newPage();
		page.setViewport({
			deviceScaleFactor: 2,
			width: 1920,
			height: 1080
		});

		let html = fs.readFileSync('./.build/index.html', 'utf8');
		const regEx = new RegExp(graphic.path, 'g');
		html = html.replace(regEx, pathFinder.get('local', graphic));
		await page.setContent(html, {
			waitUntil: 'load'
		});

		let el = await page.$(`.graphics--${graphic.name} .graphics__content`);
		let image = await el.screenshot();

		fs.writeFileSync('./.build/' + graphic.name + '/fallback.png', image);

		await page.close();
		await browser.close();

		logger.log('fallback', 'Screenshot of graphic saved');
	}
};
