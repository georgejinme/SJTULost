var webpack = require('webpack');

module.exports = {
  entry: './static/shared/navigation.jsx',
  output: {
    filename: './static/shared/bundle.js'
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