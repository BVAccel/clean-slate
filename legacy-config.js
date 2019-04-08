const babel = require('@babel/core');
const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

const scriptPaths = `${path.resolve('./src/assets/scripts/legacy')}/**/*.js`;
const scriptName = process.env.LEGACY_SCRIPT_NAME || 'legacy';
const scriptFilename = `${scriptName}.js.liquid`;

const minLegacySingleScriptsPlugin = new CopyWebpackPlugin([
  {
    to: '[name].min.[ext]',
    from: { glob: scriptPaths },
    flatten: true,
    transform: (code) => babel.transform(code, { presets: ['minify'] }).code,
  },
]);

const minLegacyMegaScriptPlugin = new MergeIntoSingleFilePlugin(
{
  files: [
    {
      src: glob.sync(scriptPaths),
      dest: (code) => {
        const data = {};
        data[scriptFilename] = babel.transform(code, { presets: ['minify'] }).code;
        return data;
      },
    },
  ],
});

module.exports = {
  minLegacySingleScriptsPlugin,
  minLegacyMegaScriptPlugin,
};