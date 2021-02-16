import React from 'react'
import Layout from '../components/layout'
import {CardContent, CardHeader, Divider} from '@material-ui/core'
import {graphql, useStaticQuery} from 'gatsby'
import HtmlHead from '../components/htmlHead'
import PostDate from '../components/post/postDate'
import PostItem from '../components/post/postItem'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      allMarkdownRemark(
        filter: {fields: {type: {eq: "posts"}}}
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
              updDate(formatString: "YYYY-MM-DD")
              pubDate(formatString: "YYYY-MM-DD")
              excerpt
              tags
            }
          }
        }
      }
    }
  `)
  const {edges} = data.allMarkdownRemark
  const updDate = edges.map(({node}) => node.frontmatter.updDate).reduce((a, b) => a > b ? a : b)
  const pubDate = edges.map(({node}) => node.frontmatter.pubDate).reduce((a, b) => a > b ? a : b)

  return (
    <Layout>
      <HtmlHead title={'Index: Post List'} description={'All Posts written by myl7 in the blog.'} path={'/'} />
      <CardHeader title={'Posts'} titleTypographyProps={{component: 'h1'}} subheader={
        <PostDate updDate={updDate} pubDate={pubDate} />
      } />
      <Divider />
      <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
        {data.allMarkdownRemark.edges.map(({node}) => {
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

export default IndexPage
