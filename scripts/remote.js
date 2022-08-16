const cmd = require('node-cmd');

module.exports = {
	deploy(graphic) {
		const profile = process.env.AWS_PROFILE || 'operations_prod';
		var bucket = process.env.S3_UPLOADS_BUCKET || 'mrkp-wp-uploads-themarkup-org-production';
		const repo_name = (process.env.GITHUB_REPOSITORY || "").replace("the-markup/graphics-", "");
		if (process.argv.indexOf('staging') > -1) {
			bucket = 'mrkp-wp-uploads-themarkup-org-staging';
		}
		var env = `S3_UPLOADS_BUCKET="${bucket}"`;

		// if this is part of the github autodeploy don't set the profile
		if (!repo_name) {
			env = `${env} AWS_PROFILE="${profile}"`
		}

		cmd.get(`${env} bash scripts/remote/deploy ${graphic.name} ${graphic.version} ${repo_name} `, (error, data) => {
			if (error) {
				console.log(error);
			}
			console.log(data);
		});
	}
}
