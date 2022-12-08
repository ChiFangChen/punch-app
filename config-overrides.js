const path = require('path');
const { override, addBabelPresets, addWebpackAlias } = require('customize-cra');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = override(
  ...addBabelPresets([
    '@babel/preset-react',
    {
      runtime: 'automatic',
      importSource: '@emotion/react',
    },
  ]),
  addWebpackAlias({
    '@': resolve('src'),
  })
);
