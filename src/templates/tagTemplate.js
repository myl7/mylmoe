import React from 'react'
import {graphql, navigate} from 'gatsby'
import Layout from '../components/layout'
import HtmlHead from '../components/htmlHead'
import {Box, Card, CardActionArea, CardContent, CardHeader, Chip, Divider} from '@material-ui/core'

const TagTemplate = props => {
  const {tag} = props.pageContext
  const {edges} = props.data.allMarkdownRemark
  const updDates = []
  const pubDates = []
  for (const {node} of edges) {
    const {updDate, pubDate} = node.frontmatter
    updDates.push(updDate)
    pubDates.push(pubDate)
  }
  const updDate = updDates.reduce((a, b) => a > b ? a : b)
  const pubDate = pubDates.reduce((a, b) => a > b ? a : b)

  const handleCardClick = path => () => navigate(path)
  const handleTagClick = tag => e => {
    e.stopPropagation()
    navigate(`/tags/${tag}/`)
  }

  return (
    <Layout>
      <HtmlHead title={`Tag ${tag}: Post List`} description={`All Posts with tag ${tag} written by myl7 in the blog.`}
                path={`/tags/${tag}/`} />
      <CardHeader title={`Tag ${tag}`} titleTypographyProps={{component: 'h1'}} subheader={
        <div>
          Updated on {''}
          <Box component={'span'} fontWeight={'fontWeightBold'}>
            {updDate}
          </Box>
          {''} | Published on {''}
          <Box component={'span'} fontWeight={'fontWeightBold'}>
            {pubDate}
          </Box>
        </div>
      } />
      <Divider />
      <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
        {edges.map(({node}) => {
          const {fields, frontmatter} = node
          const {path} = fields
          const {title, pubDate, updDate, excerpt, tags} = frontmatter

          return (
            <Card variant="outlined" style={{margin: '1em'}} component="article" key={path}>
              <CardActionArea onClick={handleCardClick(path)}>
                <CardHeader title={title} titleTypographyProps={{component: 'h2'}} subheader={
                  <div>
                    <div>
                      Updated on {''}
                      <Box component={'span'} fontWeight={'fontWeightBold'}>
                        {updDate}
                      </Box>
                      {''} | Published on {''}
                      <Box component={'span'} fontWeight={'fontWeightBold'}>
                        {pubDate}
                      </Box>
                    </div>
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
