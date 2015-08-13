const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: "./js/ProperTable.js",
    html: "../examples/index.html"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass?includePaths[]='+path.resolve(__dirname, "./node_modules/compass-mixins/lib"))
      },
      { test: /globalize/, loaders: ["babel-loader", 'imports?define=>false'] }
    ],
  },
  externals: {
    'react/addons': 'React',
    'jquery': '$',
    'underscore': '_',
    'moment': 'moment'
  },
  output: {
    libraryTarget: "var",
    library: "ProperTable",
    filename: "ProperTable.js",
    path: __dirname + "/dist"
  },
  plugins: [
    new ExtractTextPlugin('propertable.css', {
      allChunks: true
    })
  ]
}