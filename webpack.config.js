const path = require('path');

module.exports = {
  entry: {
    'tab': './examples/tab/index.js',
    'table-list': './examples/table-list/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'examples'),
    filename: '[name]/bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }],
  },
};
