const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { rootPath, sourcePath, outputPath, production, development, mode } = require('./constants');

module.exports = {
  rules: [
    // scss
    {
      test: /\.scss/,
      loader: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false,
            modules: {
              namedExport: true,
            },
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            esModule: true,
            importLoaders: 1,
            localsConvention: 'camelCase',
            modules: {
              localIdentName: '[name]__[local]_[hash:base64:5]',
            },
          },
        },
        {
          loader: 'postcss-loader', // Run post css actions
          options: {
            sourceMap: true,
            plugins: function () {
              // post css plugins, can be exported to postcss.config.js
              return [require('autoprefixer')()];
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },

    // js
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: path.resolve(rootPath, '.etmp/babel-loader'),
        configFile: path.resolve(rootPath, '.babelrc.js'),
      },
    },
  ],
};
