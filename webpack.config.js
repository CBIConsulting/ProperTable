const webpack = require('webpack');
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
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ],
  },
  externals: {
    'react/addons': 'React',
    'jquery': '$',
    'underscore': '_'
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