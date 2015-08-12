var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: "./js/ProperTable.js",
    html: "../examples/index.html",
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
        loader: 'style!css!sass'
      },
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
      { test: /\.useable\.css$/, loader: "style/useable!css" }
    ],
  },
  output: {
    libraryTarget: "var",
    library: "ProperTable",
    filename: "ProperTable.js",
    path: __dirname + "/dist",
  }
}