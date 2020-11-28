const path = require('path');

const { rootPath, sourcePath, outputPath, production, development, mode } = require('./constants');

module.exports = {
  mode,
  devtool: mode === production ? 'source-map' : 'inline-source-map',
  entry: path.resolve(sourcePath, 'index.js'),
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  optimization: {
    minimizer: [],
  },
  target: 'web',
  module: require('./module'),
  plugins: require('./plugins'),
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  devServer: {
    contentBase: outputPath,
    port: 9000,
  },
};
