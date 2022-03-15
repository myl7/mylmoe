module.exports = {
  webpack5: true,
  webpack: config => {
    config.experiments = {
      ...config.experiments,
      syncWebAssembly: true,
    }
    return config
  },
}
