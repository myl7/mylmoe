/**
 * Be compatible with old links
 * Comment some of them since some pages have not been migrated yet or would not
 * { source: '/posts/:slug', destination: '/:slug', permanent: true },
 * { source: '/pages/:slug(dn42|about|friends|privacy-policy|tags|cv)', destination: '/:slug', permanent: true },
 * @type {import('next').Redirect[]}
 */
const compatibleRedirects = [
  ...[
    '2021-12-01-open-source-desktop-show',
    '2021-12-19-aria2-socks-proxy-trouble',
    '2021-12-26-raspi-headless-init',
  ].flatMap((oldSlug) => [
    {
      source: '/posts/' + oldSlug,
      destination: '/posts/' + oldSlug.substring('0000-00-00-'.length),
      permanent: true,
    },
    {
      source: '/' + oldSlug.substring('0000-00-00-'.length),
      destination: '/posts/' + oldSlug.substring('0000-00-00-'.length),
      permanent: true,
    },
  ]),
  ...['mylmoe-demo', 'hacks-for-mdx-md-in-nextjs', 'tree-shaking-on-object-exports'].map((oldSlug) => ({
    source: '/' + oldSlug,
    destination: '/posts/' + oldSlug,
    permanent: true,
  })),
  { source: '/utils/brotli', destination: '/brotli', permanent: true },
  { source: '/pages/privacy-policy', destination: '/privacy-policy', permanent: true },
  { source: '/privacy-policy-of-us', destination: '/privacy-policy', permanent: true },
  { source: '/share-list', destination: '/share', permanent: true },
  { source: '/sitemap.xml', destination: '/sitemap.txt', permanent: false },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    // TODO: Using serialize causes the error in building:
    // export 'serialize' (reexported as 'serialize') was not found in './dist/serialize.js' (module has no exports)
    // Wait for next-mdx-remote to fix this.
    // runtime: 'experimental-edge',
  },
  rewrites: async () => [
    { source: '/rss.xml', destination: '/api/rss' },
    { source: '/atom.xml', destination: '/api/atom' },
    { source: '/sitemap.txt', destination: '/api/sitemap' },
    { source: '/u/:slug', destination: '/api/url/:slug' },
  ],
  redirects: async () => compatibleRedirects,
  headers: async () => [
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
  ],
}

function withWebpack(nextConfig) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer, nextRuntime } = options

      config.module.rules.push({
        resourceQuery: /raw/,
        type: 'asset/source',
      })

      if (isServer && nextRuntime === 'edge') {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          stream: require.resolve('stream-browserify'),
        }
      }

      if (typeof nextConfig.webpack == 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    },
  })
}

module.exports = withWebpack(nextConfig)
