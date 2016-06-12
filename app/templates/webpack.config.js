var path = require('path');
var webpack = require('webpack');

var entry = require('./entry.js');

module.exports = {
  devtool: 'source-map',
  entry: [
   "webpack-hot-middleware/client",
   "./client/index.js"
  ],
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'bundle.js',
    publicPath: '/bundle/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
  },
  module: {
    loaders: [
    {
      test: /\.js?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
      
    },
    // CSS
    { 
      test: /\.scss$|\.css$/, 
      include: path.join(__dirname, 'bundle'),
      loader: 'style-loader!css-loader'
    }
    ]
  }
};