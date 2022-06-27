const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require ('path')

module.exports = {

  entry: {
    app: ['babel-polyfill','./src/index.js']
  },

  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/main.css"
    }), 
    new HTMLWebpackPlugin({
      template: "./public/index.html"
    })
  ],

  module : {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {publicPath: ""}
          }, 
          "css-loader", 
          "postcss-loader", 
          "sass-loader"
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(svg|png|jpe?g)$/,
        type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]',
            publicPath: '/'
          }
      },
    ]
  },
  
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
}