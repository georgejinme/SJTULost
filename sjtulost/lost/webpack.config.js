var webpack = require('webpack');

var homePath = './static/home/home.jsx';
var homeOutput = './static/home/bundle.js';

module.exports = {
  entry: homePath,
  output: {
    filename: homeOutput
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders:[
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader' },
      { test: /\.js$/, exclude:/node_modules/, loader: 'babel-loader'}
    ]
  }
};