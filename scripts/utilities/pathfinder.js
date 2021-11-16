module.exports = {
	get(env, graphic) {
		if (env && env === 'remote') {
			var hostname = 'mrkp-static-production.themarkup.org';
			if (process.argv.indexOf('staging') > -1) {
				hostname = 'mrkp-static-staging.themarkup.org';
			}

			var repo_name = "";
			if (process.env.GITHUB_REPOSITORY) {
				repo_name = `${process.env.GITHUB_REPOSITORY}_`;
			}

			return `https://${hostname}/graphics/${repo_name}${graphic.name}/${graphic.version}`;
		} else {
			return `http://localhost:5000/${graphic.name}`;
		}
	}
}
