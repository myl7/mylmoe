/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      { source: '/rss.xml', destination: '/api/rss' },
      { source: '/atom.xml', destination: '/api/atom' },
      { source: '/sitemap.xml', destination: '/api/sitemap' },
      { source: '/u/:slug', destination: '/api/url/:slug' },
    ]
  },
  async redirects() {
    return [
      // Be compatible with old links
      // Comment some of them since some pages have not been migrated yet or would not
      // { source: '/posts/:slug', destination: '/:slug', permanent: true },
      // { source: '/pages/:slug(dn42|about|friends|privacy-policy|tags|cv)', destination: '/:slug', permanent: true },
      { source: '/utils/brotli', destination: '/brotli', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/rss.xml',
        headers: [
          { key: 'content-type', value: 'application/rss+xml' },
          { key: 'content-disposition', value: 'inline' },
        ],
      },
      {
        source: '/atom.xml',
        headers: [
          { key: 'content-type', value: 'application/atom+xml' },
          { key: 'content-disposition', value: 'inline' },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'content-type', value: 'application/xml' },
          { key: 'content-disposition', value: 'inline' },
        ],
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
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    return config
  },
}

module.exports = nextConfig
