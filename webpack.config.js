const path = require('path');
const fs = require('fs');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = [
  {
    context: path.join(__dirname, './src'),
    entry: {
      server: ['babel-polyfill', './server.js'],
    },
    output: {
      libary: true,
      libraryTarget: 'commonjs2',
      filename: '[name].js',
      chunkFilename: '[id].js',
      sourceMapFilename: '[file].map',
      path: path.join(__dirname, './build'),
      devtoolModuleFilenameTemplate: 'file:///[resource-path]',
      devtoolFallbackModuleFilenameTemplate: 'file:///[resourcePath]?[hash]',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ['babel-loader'],
        },
        {
          test: /\.json$/,
          exclude: /node_modules/,
          loaders: ['json-loader'],
        },
      ],
      preLoaders: [
        {
          test: /\.js$/,
          loaders: ['source-map-loader'],
        },
      ],
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    },

    externals: nodeModules,
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.BannerPlugin('require("source-map-support").install();',
        { raw: true, entryOnly: false }),
    ],
  },
];
