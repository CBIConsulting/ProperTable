const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const examplePath = path.join(__dirname, '/examples');

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: {
    javascript: path.join(examplePath, 'jsx/example.js'),
    html: path.join(examplePath, '/index.html')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass?includePaths[]='+path.resolve(__dirname, "./node_modules/compass-mixins/lib")),
        exclude: /node_modules/
      }
    ],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'jquery': 'jQuery',
    'jquery': '$',
    'underscore': '_',
    'moment': 'moment',
    'reflux': 'Reflux'
  },
  devtool: 'eval',
  output: {
    libraryTarget: "var",
    library: "ProperTable",
    filename: "example.js",
    path: path.join(__dirname, "/dist")
  },
  plugins: [
    new ExtractTextPlugin('propertable.css', {
      allChunks: true
    }),
    new webpack.optimize.DedupePlugin()
  ]
}