/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      { source: '/rss.xml', destination: '/api/rss' },
      { source: '/atom.xml', destination: '/api/atom' },
      { source: '/sitemap.xml', destination: '/api/sitemap' },
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
        ],
      },
      {
        source: '/.well-known/matrix/client',
        headers: [
          { key: 'content-type', value: 'application/json' },
          { key: 'content-disposition', value: 'inline' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
