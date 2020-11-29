const path = require('path');

const rootPath = process.cwd();
const sourcePath = path.resolve(rootPath, 'src');
const outputPath = path.resolve(rootPath, 'build');

const production = 'production';
const development = 'development';
const mode = process.env === production ? production : development;

module.exports = {
  rootPath,
  sourcePath,
  outputPath,
  production,
  development,
  mode,
};
