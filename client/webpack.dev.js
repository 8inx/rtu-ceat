const {merge} = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')

module.exports = merge(common, {

  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000,
    historyApiFallback: true,
    host:'0.0.0.0',
    hot: true,
  },

  plugins: [],
})