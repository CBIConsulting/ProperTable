const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'examples'),
  entry: {
    javascript: "./jsx/example.js"
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
      }
    ],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'underscore': '_'
  },
  output: {
    libraryTarget: "var",
    library: "App",
    filename: "app.js",
    path: __dirname + "/examples/dist"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
            APP_ENV: JSON.stringify('web')
        },
    })
  ]
}