import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import HtmlHead from '../components/htmlHead'
import {CardContent, CardHeader, Divider} from '@material-ui/core'
import PostDate from '../components/post/postDate'
import PostItem from '../components/post/postItem'

const TagTemplate = props => {
  const {tag} = props.pageContext
  const {edges} = props.data.allMarkdownRemark
  const updDate = edges.map(({node}) => node.frontmatter.updDate).reduce((a, b) => a > b ? a : b)
  const pubDate = edges.map(({node}) => node.frontmatter.pubDate).reduce((a, b) => a > b ? a : b)

  return (
    <Layout>
      <HtmlHead title={`Tag ${tag}: Post List`} description={`All Posts with tag ${tag} written by myl7 in the blog.`}
                path={`/tags/${tag}/`} />
      <CardHeader title={`Tag ${tag}`} titleTypographyProps={{component: 'h1'}} subheader={
        <PostDate updDate={updDate} pubDate={pubDate} />
      } />
      <Divider />
      <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
        {edges.map(({node}) => {
          const {fields, frontmatter} = node
          const {path} = fields
          const {title, pubDate, updDate, excerpt, tags} = frontmatter

          return (
            <PostItem title={title} pubDate={pubDate} updDate={updDate} excerpt={excerpt} tags={tags} path={path}
                      key={path} style={{margin: '1em'}} />
          )
        })}
      </CardContent>
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
