import type { Configuration } from 'webpack'
import { remarkPlugins, rehypePlugins } from './remark/mdx'

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
    providerImportSource: '@mdx-js/react',
  },
})

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  webpack5: true,
  webpack: (config: Configuration) => {
    config.experiments = {
      ...config.experiments,
      syncWebAssembly: true,
    }
    return config
  },
})
