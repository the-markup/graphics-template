const cmd = require('node-cmd')

module.exports = {
  deploy(version) {
    cmd.get('sh scripts/remote/deploy ' + version, (error, data) => {
      if (error) {
        console.log(error);
      }
      console.log(data);
    });
  }
}