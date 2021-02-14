import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'

const TagTemplate = props => {
  return (
    <Layout>
      Hello world!
    </Layout>
  )
}

export default TagTemplate

export const tagQuery = graphql`
  query TagQuery($tag: String) {
    allMarkdownRemark(
      filter: {fields: {type: {eq: "posts"}, tags: {glob: $tag}}}
      limit: 1000
      sort: {order: DESC, fields: frontmatter___pubDate}
    ) {
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            title
            pubDate(formatString: "YYYY-MM-DD")
            updDate(formatString: "YYYY-MM-DD")
            excerpt
            tags
          }
        }
      }
    }
  }
`
