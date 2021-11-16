module.exports = {
	get(env, graphic) {
		if (env && env === 'remote') {
			var hostname = 'mrkp-static-production.themarkup.org';
			if (process.argv.indexOf('staging') > -1) {
				hostname = 'mrkp-static-staging.themarkup.org';
			}

			var repo = "";
			if (process.env.GITHUB_REPOSITORY) {
				repo_name = `${process.env.GITHUB_REPOSITORY}/`;
			}

			return `https://${hostname}/graphics/${repo_name}${graphic.name}/${graphic.version}`;
		} else {
			return `http://localhost:5000/${graphic.name}`;
		}
	}
}
