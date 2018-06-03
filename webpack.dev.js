const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // contentBase: path.join(__dirname, "public"),
    contentBase: './public',
    historyApiFallback: true
  }
});
