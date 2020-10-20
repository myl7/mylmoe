const {merge} = require('webpack-merge')
const common = require('./common.cjs')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CompressionPlugin({
      test: /\.js$/,
      deleteOriginalAssets: true
    })
  ]
})
