const {merge} = require('webpack-merge')
const common = require('./common.cjs')

module.exports = merge(common, {
  mode: 'production'
})
