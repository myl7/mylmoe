module.exports = {
  siteMetadata: {
    title: 'mylmoe',
    siteUrl: 'https://myl.moe',
    author: {
      name: 'myl7',
      email: 'myl@myl.moe',
      avatar: '' // Leave empty to use Gravatar
    }
  },
  plugins: [
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
        icon: 'src/images/icon.png'
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-mdx',
    'gatsby-transformer-sharp',
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
    }
  ]
}
