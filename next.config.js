/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

function withWebpack(nextConfig) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        resourceQuery: /raw/,
        type: 'asset/source',
      })

      if (typeof nextConfig.webpack == 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  })
}

module.exports = withWebpack(nextConfig)
