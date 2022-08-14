// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { Configuration } from 'webpack'
import type { NextConfig } from 'next'
import { remarkPlugins, rehypePlugins } from './remark/mdx'
// @ts-ignore
import getWithMDX from '@next/mdx'
import site from './content/site'

const withMDX = getWithMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
    providerImportSource: '@mdx-js/react',
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  webpack: (config: Configuration) => {
    config.experiments = {
      ...config.experiments,
      syncWebAssembly: true,
    }
    return config
  },
  redirects: async () => {
    return [
      {
        source: '/pages/about',
        destination: site.profileUrl,
        permanent: false,
      },
    ]
  },
  headers: async () => {
    return [
      {
        source: '/.well-known/matrix/*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ]
  },
}

export default withMDX(nextConfig)
