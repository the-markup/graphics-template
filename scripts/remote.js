const cmd = require('node-cmd');

module.exports = {
	deploy(graphic) {
		var env = '';
		if (process.argv.indexOf('staging') > -1) {
			env = 'S3_UPLOADS_BUCKET="mrkp-wp-uploads-themarkup-org-staging"'
		}
		console.log(`${env} sh scripts/remote/deploy ${graphic.name} ${graphic.version}`);
		process.exit();
		cmd.get(`${env} sh scripts/remote/deploy ${graphic.name} ${graphic.version}`, (error, data) => {
			if (error) {
				console.log(error);
			}
			console.log(data);
		});
	}
}
