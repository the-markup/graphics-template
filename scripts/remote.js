const cmd = require('node-cmd');

module.exports = {
	deploy(graphic) {
		const profile = process.env.AWS_PROFILE || 'operations_prod';
		var bucket = process.env.S3_UPLOADS_BUCKET || 'mrkp-wp-uploads-themarkup-org-production';
		const graphic_name = (process.env.GITHUB_REPOSITORY || graphic.name).replace("the-markup/", "");
		if (process.argv.indexOf('staging') > -1) {
			bucket = 'mrkp-wp-uploads-themarkup-org-staging';
		}
		const env = `AWS_PROFILE="${profile}" S3_UPLOADS_BUCKET="${bucket}"`;
		cmd.get(`${env} sh scripts/remote/deploy ${graphic_name} ${graphic.version}`, (error, data) => {
			if (error) {
				console.log(error);
			}
			console.log(data);
		});
	}
}
