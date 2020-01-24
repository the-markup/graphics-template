const fs = require('fs-extra');
const sass = require('node-sass');

module.exports = {
  render(path) {
    const css = sass.renderSync({
      file: path
    }).css.toString('utf8');

    const fileName = path.replace(/^.*[\\\/]/, '').replace('.scss', '');

    fs.writeFileSync(`.build/${fileName}.css`, css);
  }
}