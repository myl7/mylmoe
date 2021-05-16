const {createFilePath} = require('gatsby-source-filesystem')

exports.onCreateNode = ({actions, node, getNode}) => {
  const {createNodeField} = actions

  if (node.internal.type === 'MarkdownRemark') {
    const path = createFilePath({node, getNode, basePath: 'site'})
    createNodeField({node, name: 'path', value: path})
    const type = path.substring(1, path.substring(1).indexOf('/') + 1)
    createNodeField({node, name: 'type', value: type})
    const slug = path.substring(path.substring(0, path.length - 1).lastIndexOf('/') + 1, path.length - 1)
    createNodeField({node, name: 'slug', value: slug})

    if (type === 'posts') {
      const tags = node.frontmatter.tags.split(' ')
      createNodeField({node, name: 'tags', value: tags})
    }
  }
}

exports.createPages = async ({actions, graphql}) => {
  const {createPage} = actions
  const postTemplate = require.resolve('./src/templates/postTemplate.js')
  const pageTemplate = require.resolve('./src/templates/pageTemplate.js')
  const tagTemplate = require.resolve('./src/templates/tagTemplate.js')
  let res

  res = await graphql(`
    {
      allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___pubDate]}, limit: 1000) {
        edges {
          node {
            fields {
              type
              path
            }
          }
        }
      }
    }
  `)
  if (res.errors) {
    throw new res.errors
  }
  res.data.allMarkdownRemark.edges.forEach(({node}) => {
    const {path, type} = node.fields
    createPage({
      path: path,
      component: type === 'posts' ? postTemplate : pageTemplate,
      context: {
        postPath: path,
        pagePath: path
      }
    })
  })

  res = await graphql(`
    {
      allMarkdownRemark(filter: {fields: {type: {eq: "posts"}}}, limit: 1000) {
        edges {
          node {
            fields {
              tags
            }
          }
        }
      }
    }
  `)
  if (res.errors) {
    throw new res.errors
  }
  const tags = new Set()
  res.data.allMarkdownRemark.edges.forEach(({node}) => {
    const {fields} = node
    const {tags: list} = fields
    list.forEach(tag => tags.add(tag))
  })
  for (const tag of tags) {
    createPage({
      path: `/tags/${tag}/`,
      component: tagTemplate,
      context: {
        tag: tag
      }
    })
  }
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify')
      }
    }
  })
}
