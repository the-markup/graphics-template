const config = require('../../config.json');

module.exports = {
  get(env, graphic) {
    if (env && env === 'remote') {
      return `https://mrkp-wp-uploads-qednews-com-production.s3.amazonaws.com/graphics/${graphic.name}/${graphic.version}/`;
    } else {
      return `http://localhost:5000/${graphic.name}`;
    }
  }
}
