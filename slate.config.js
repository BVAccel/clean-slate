/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');
const { ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const externals = {
  jquery: 'jQuery',
};

const plugins = [
  new ProvidePlugin({
    '$': 'jquery',
    'jQuery': 'jquery',
    'window.$': 'jquery',
    'window.jQuery': 'jquery',
    'PubSub': 'pubsub-js',
  }),
  new CopyWebpackPlugin([
    {
      from: 'sections/**/*',
      to: '../sections/',
      flatten: true,
    },
    {
      from: 'snippets/**/*',
      to: '../snippets/',
      flatten: true,
    },
    {
      from: 'scripts/**/*.liquid',
      to: '../snippets/',
      flatten: true,
    },
    {
      from: 'scripts/components/**/*.liquid',
      to: '../snippets/',
      flatten: true,
    }
  ], { ignore: [ 'static/*' ] }),
];

const alias = {
  'styles': path.resolve('./src/styles'),
  'scripts': path.resolve('./src/scripts'),
  'common': path.resolve('./src/scripts/common'),
  'components': path.resolve('./src/scripts/components'),
  'state': path.resolve('./src/scripts/state'),
};

module.exports = {
  'eslint.config': '.eslintrc.js',
  'cssVarLoader.liquidPath': ['src/snippets/api/css-variables.liquid'],
  'paths.theme.src.snippets': 'snippets/static',
  'paths.theme.src.sections': 'sections/static',
  'webpack.extend': {
    externals,
    plugins,
    resolve: { alias },
  },
};
