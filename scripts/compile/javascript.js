const fs = require('fs-extra');
const rollup = require('rollup');
const rollupResolve = require('rollup-plugin-node-resolve');
const rollupCommonJs = require('rollup-plugin-commonjs');

let inputOptions = {
  plugins: [
    rollupResolve(),
    rollupCommonJs()
  ]
};

const outputOptions = {
  format: 'iife'
};

module.exports = {
  render(path) {
    (async function() {
      inputOptions.input = path;
      const bundle = await rollup.rollup(inputOptions);
      const output = await bundle.generate(outputOptions);
      const fileName = path.replace(/^.*[\\\/]/, '');
      fs.writeFileSync('.build/' + fileName, output.output[0].code);
    })();
  }
}