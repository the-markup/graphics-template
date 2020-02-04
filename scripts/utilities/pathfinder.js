const config = require('../../config.json');

module.exports = {
  get(env, version) {
    if (env && env === 'remote') {
      return `https://mrkp-wp-uploads-qednews-com-production.s3.amazonaws.com/graphics/${config.name}/${version}/`;
    } else {
      return 'http://localhost:5000/';
    }
  }
}
