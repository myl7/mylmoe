const path = require('path')

const withBundleAnalyzer = process.env.ANALYZE === '1' ? require('@next/bundle-analyzer')({ enabled: true }) : (c) => c

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'experimental-edge',
    images: { allowFutureImage: true },
  },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      { source: '/rss.xml', destination: '/api/rss' },
      { source: '/atom.xml', destination: '/api/atom' },
      { source: '/sitemap.txt', destination: '/api/sitemap' },
      { source: '/u/:slug', destination: '/api/url/:slug' },
    ]
  },
  async redirects() {
    return [
      // Be compatible with old links
      // Comment some of them since some pages have not been migrated yet or would not
      // { source: '/posts/:slug', destination: '/:slug', permanent: true },
      // { source: '/pages/:slug(dn42|about|friends|privacy-policy|tags|cv)', destination: '/:slug', permanent: true },
      {
        source: '/posts/2021-12-01-open-source-desktop-show',
        destination: '/open-source-desktop-show',
        permanent: true,
      },
      {
        source: '/posts/2021-12-19-aria2-socks-proxy-trouble',
        destination: '/aria2-socks-proxy-trouble',
        permanent: true,
      },
      { source: '/posts/2021-12-26-raspi-headless-init', destination: '/raspi-headless-init', permanent: true },
      { source: '/utils/brotli', destination: '/brotli', permanent: true },
      { source: '/pages/privacy-policy', destination: '/privacy-policy-of-us', permanent: true },
      { source: '/pages/about', destination: '/myl7', permanent: true },
      { source: '/pages/share', destination: '/share', permanent: true },
      { source: '/privacy-policy', destination: '/privacy-policy-of-us', permanent: true },
      { source: '/sitemap.xml', destination: '/sitemap.txt', permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/rss.xml',
        headers: [
          { key: 'content-type', value: 'application/rss+xml' },
          { key: 'content-disposition', value: 'inline' },
          // 2678400 is the default cache age of Vercel for static files
          { key: 'cache-control', value: 'public, max-age=0, must-revalidate, s-maxage=2678400' },
        ],
      },
      {
        source: '/atom.xml',
        headers: [
          { key: 'content-type', value: 'application/atom+xml' },
          { key: 'content-disposition', value: 'inline' },
          { key: 'cache-control', value: 'public, max-age=0, must-revalidate, s-maxage=2678400' },
        ],
      },
      {
        source: '/sitemap.txt',
        headers: [{ key: 'cache-control', value: 'public, max-age=0, must-revalidate, s-maxage=2678400' }],
      },
      {
        source: '/.well-known/matrix/server',
        headers: [
          { key: 'content-type', value: 'application/json' },
          { key: 'content-disposition', value: 'inline' },
          { key: 'access-control-allow-origin', value: '*' },
        ],
      },
      {
        source: '/.well-known/matrix/client',
        headers: [
          { key: 'content-type', value: 'application/json' },
          { key: 'content-disposition', value: 'inline' },
          { key: 'access-control-allow-origin', value: '*' },
        ],
      },
    ]
  },
  webpack: (config, { isServer, nextRuntime }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    config.module.rules.push(
      {
        test: /_dir\.[jt]sx?$/,
        use: { loader: path.resolve('utils/webpack/dirLoader.js'), options: { include: /\.mdx?$/ } },
        type: 'javascript/auto',
      },
      {
        test: /_images\.[jt]sx?$/,
        use: { loader: path.resolve('utils/webpack/collectedImageLoader.js'), options: { include: /^\/images\// } },
        type: 'javascript/auto',
      },
      {
        test: /\.mdx?$/,
        type: 'asset/source',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    )
    if (isServer && nextRuntime === 'edge') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve('stream-browserify'),
      }
    }
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
