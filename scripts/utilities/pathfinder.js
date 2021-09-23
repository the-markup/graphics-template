module.exports = {
	get(env, graphic) {
		if (env && env === 'remote') {
			var hostname = 'mrkp-static-production.themarkup.org';
			if (process.argv.indexOf('staging') > -1) {
				hostname = 'mrkp-static-staging.themarkup.org';
			}
			return `https://${hostname}/graphics/${graphic.name}/${graphic.version}`;
		} else {
			return `http://localhost:5000/${graphic.name}`;
		}
	}
}
