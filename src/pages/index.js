import React from 'react'
import Layout from '../components/layout'
import {Box, Card, CardActionArea, CardContent, CardHeader, Divider} from '@material-ui/core'
import {graphql, navigate, useStaticQuery} from 'gatsby'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      allMarkdownRemark(filter: {fields: {type: {eq: "posts"}}}, limit: 1000) {
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
  const updDates = []
  const pubDates = []
  for (const {node} of data.allMarkdownRemark.edges) {
    const {updDate, pubDate} = node.frontmatter
    updDates.push(updDate)
    pubDates.push(pubDate)
  }
  const updDate = updDates.reduce((a, b) => a > b ? a : b)
  const pubDate = pubDates.reduce((a, b) => a > b ? a : b)

  const handleClick = path => () => navigate(path)

  return (
    <Layout>
      <CardHeader title={'Posts'} titleTypographyProps={{component: 'h1'}} subheader={
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
        {data.allMarkdownRemark.edges.map(({node}) => {
          const {fields, frontmatter} = node
          const {path} = fields
          const {title, pubDate, updDate, excerpt, tags} = frontmatter

          return (
            <Card variant="outlined" style={{margin: '1em'}} component="article">
              <CardActionArea onClick={handleClick(path)}>
                <CardHeader title={title} titleTypographyProps={{component: 'h2'}} subheader={
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
