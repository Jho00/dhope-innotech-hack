const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const { sourcePath } = require('./constants');

module.exports = [
  new MiniCssExtractPlugin(),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(sourcePath, 'index.html'),
  }),

  new CopyWebpackPlugin({
    patterns: [
      {
        from: `${sourcePath}/styles/reset.css`,
        to: 'reset.css',
      },
    ],
  }),

  // svg bundle
  new SVGSpritemapPlugin([sourcePath + '/icons/*.svg'], {
    output: {
      filename: 'svg-icons.svg',
      svgo: false,
    },
    sprite: {
      prefix: false,
      generate: {
        title: false,
        use: true,
      },
    },
  }),
];
