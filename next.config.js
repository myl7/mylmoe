const withTM = require('next-transpile-modules')(['hast-util-classnames'])

module.exports = withTM({
  future: {
    webpack5: true
  },
  webpack: config => {
    config.experiments = {
      ...config.experiments,
      syncWebAssembly: true
    }
    return config
  }
})
