const {merge} = require('webpack-merge')
const common = require('./common.cjs')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  }
})
