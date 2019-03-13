/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');
const { ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const graphqlLoader = require('graphql-tag/loader');
const PrettierPlugin = require('prettier-webpack-plugin');

const sectionsBase = 'core';
const snippetsBase = 'core';

const externals = {
  jquery: 'jQuery',
};

const plugins = [
  new ProvidePlugin({
    '$': 'jquery',
    'jQuery': 'jquery',
    'window.$': 'jquery',
    'window.jQuery': 'jquery',
  }),
  new CopyWebpackPlugin([
    {
      from: 'sections/**/*',
      to: '../sections/',
      flatten: true
    },
    {
      from: 'snippets/**/*',
      to: '../snippets/',
      flatten: true
    }
  ], { ignore: [ 'core/*' ] }),
  new PrettierPlugin ()
];

const alias = {
  'styles': path.resolve('./src/styles'),
  'scripts': path.resolve('./src/scripts'),
  'common': path.resolve('./src/scripts/common'),
  'components': path.resolve('./src/scripts/components'),
  'state': path.resolve('./src/scripts/state'),
  'collection': path.resolve('./src/scripts/components/_Collection/components'),
};

module.exports = {
  'eslint.config': '.eslintrc.js',
  'cssVarLoader.liquidPath': ['src/snippets/api/css/css-variables.liquid'],
  'paths.theme.src.sections': `sections/${sectionsBase}`,
  'paths.theme.src.snippets': `snippets/${snippetsBase}`,
  'webpack.extend': {
    externals,
    plugins,
    resolve: { alias },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](pubsub-js)[\\/]/,
            name: 'vendor',
            chunks: 'all',
            enforce: true,
          }
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: [
            { loader: 'graphql-tag/loader' }
          ]
        }
      ]
    }
  },
};
