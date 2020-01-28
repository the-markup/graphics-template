const fs = require('fs-extra');
const rollup = require('rollup');
const rollupResolve = require('rollup-plugin-node-resolve');
const rollupCommonJs = require('rollup-plugin-commonjs');
const logger = require('../utilities/logger');

let inputOptions = {
  plugins: [
    rollupResolve(),
    rollupCommonJs()
  ],
  preferBuiltins: false
};

const outputOptions = {
  format: 'iife',
  preferBuiltins: false
};

module.exports = {
  render(path) {
    logger.log('js', 'compiling ' + path);

    (async function() {
      inputOptions.input = path;
      const bundle = await rollup.rollup(inputOptions);
      const output = await bundle.generate(outputOptions);
      const fileName = path.replace(/^.*[\\\/]/, '');
      fs.writeFileSync('.build/' + fileName, output.output[0].code);
      logger.log('js', 'really finished ' + path);
    })();

    logger.log('js', 'finished ' + path);
  }
}