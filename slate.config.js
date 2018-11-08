/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');
const { ProvidePlugin } = require('webpack');

const plugins = [
  new ProvidePlugin({
    '$': 'jquery',
    'jQuery': 'jquery',
    'window.jQuery': 'jquery',
    'PubSub': 'pubsub-js',
  }),
];

const alias = {
  'jquery': path.resolve('./node_modules/jquery'),
  'lodash-es': path.resolve('./node_modules/lodash-es'),
  'slick': path.resolve('./node_modules/slick-carousel'),
  'styles': path.resolve('./src/assets/styles'),
  'scripts': path.resolve('./src/assets/scripts'),
  'core': path.resolve('./src/assets/scripts/core'),
  'bindings': path.resolve('./src/assets/scripts/bindings'),
  'containers': path.resolve('./src/assets/scripts/containers'),
  'handlers': path.resolve('./src/assets/scripts/handlers'),
  'nodes': path.resolve('./src/assets/scripts/nodes'),
  'controls': path.resolve('./src/assets/scripts/controls'),
  'subscribers': path.resolve('./src/assets/scripts/subscribers'),
};

const rules = [
  {
    test: require.resolve('jquery'),
    use: [{
      loader: 'expose-loader',
      options: '$'
    }]
  },
  {
    test: /snippets\/.*\.liquid$/,
    loader: 'file-loader',
    options: {
      name: `../snippets/[name].[ext]`,
    }
  },
  {
    test: /sections\/.*\.liquid$/,
    loader: 'file-loader',
    options: {
      name: `../sections/[name].[ext]`,
    }
  },
];

module.exports = {
  'eslint.config': '.eslintrc.js',
  'cssVarLoader.liquidPath': [
    'src/snippets/base/css-variables.liquid'
  ],
  'webpack.extend': {
    plugins,
    resolve: { alias },
    module: { rules },
  },
  'webpack.commonExcludes': [
    /node_modules/,
    /assets\/static/,
    /sections\/.*\.liquid$/,
    /snippets\/.*\.liquid$/,
  ],
};
