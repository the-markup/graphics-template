module.exports = {
  get(env, graphic) {
    if (env && env === 'remote') {
      return `https://mrkp-static-production.themarkup.org/graphics/${graphic.name}/${graphic.version}`;
    } else {
      return `http://localhost:5000/${graphic.name}`;
    }
  }
}
