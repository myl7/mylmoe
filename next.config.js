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
        headers: [{ key: 'content-type', value: 'application/rss+xml' }],
      },
      {
        source: '/atom.xml',
        headers: [{ key: 'content-type', value: 'application/atom+xml' }],
      },
      {
        source: '/sitemap.xml',
        headers: [{ key: 'content-type', value: 'application/xml' }],
      },
    ]
  },
}

module.exports = nextConfig
