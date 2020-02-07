const cmd = require('node-cmd')

module.exports = {
  deploy(graphic) {
    cmd.get(`sh scripts/remote/deploy ${graphic.name} ${graphic.version}`, (error, data) => {
      if (error) {
        console.log(error);
      }
      console.log(data);
    });
  }
}