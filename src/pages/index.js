import React from 'react'
import Layout from '../components/layout'
import {Card, CardActionArea, CardContent, CardHeader, Chip, Divider} from '@material-ui/core'
import {graphql, navigate, useStaticQuery} from 'gatsby'
import HtmlHead from '../components/htmlHead'
import PostDate from '../components/post/postDate'

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

  const handleCardClick = path => () => navigate(path)
  const handleTagClick = tag => e => {
    e.stopPropagation()
    navigate(`/tags/${tag}/`)
  }

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
            <Card variant="outlined" style={{margin: '1em'}} component="article" key={path}>
              <CardActionArea onClick={handleCardClick(path)}>
                <CardHeader title={title} titleTypographyProps={{component: 'h2'}} subheader={
                  <div>
                    <PostDate updDate={updDate} pubDate={pubDate} />
                    <div>
                      {tags.split(' ').map(tag => (
                        <Chip label={tag} key={tag} clickable onClick={handleTagClick(tag)}
                              style={{marginRight: '0.5em'}} />
                      ))}
                    </div>
                  </div>
                } />
                <Divider />
                <CardContent>
                  {excerpt}
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </CardContent>
    </Layout>
  )
}

export default IndexPage
