const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { sourcePath } = require('./constants');

module.exports = [
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(sourcePath, 'index.html'),
  }),
];
