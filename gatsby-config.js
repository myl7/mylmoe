module.exports = {
  siteMetadata: {
    title: 'mylmoe',
    description: 'myl7\'s blog with some other utilities.',
    siteUrl: 'https://myl.moe',
    author: {
      name: 'myl7',
      email: 'myl@myl.moe',
      avatar: '', // Leave empty to use Gravatar
      arcaeaId: '984569312'
    },
    moeCode: '20210016',
    addThisId: 'ra-602847081f8c7cc5', // Deprecated
    telegramChannel: 'mylmoe'
  },
  plugins: [
    // 'gatsby-plugin-webpack-bundle-analyser-v2',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-69FKKHXY5H'
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.svg'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              backgroundColor: 'transparent'
            }
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-embed-snippet',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              isIconAfterHeader: true
            }
          },
          'gatsby-remark-mermaid',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
              noInlineHighlight: true
            }
          },
          'gatsby-remark-katex',
          'gatsby-remark-copy-linked-files'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
        ignore: [
          '**/LICENSE'
        ]
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'site',
        path: './content/site/',
        ignore: [
          '**/LICENSE'
        ]
      },
      __key: 'site'
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'brotli-dec-wasm',
        path: './node_modules/brotli-dec-wasm/pkg/',
        ignore: [
          '**/*.js',
          '**/*.ts'
        ]
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({query: {site, allMarkdownRemark}}) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.pubDate,
                  url: site.siteMetadata.siteUrl + edge.node.fields.path,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.path,
                  custom_elements: [{'content:encoded': edge.node.html}]
                })
              })
            },
            query: `
              {
                allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___pubDate]}) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                        path
                      }
                      frontmatter {
                        title
                        pubDate
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'mylmoe\'s RSS Feed',
            match: '^/posts/'
          }
        ]
      }
    },
    'gatsby-plugin-material-ui'
  ]
}
