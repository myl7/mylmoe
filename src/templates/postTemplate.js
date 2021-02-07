import React from 'react'
import Layout from '../components/layout'
import {Box, CardContent, CardHeader, Chip, Divider} from '@material-ui/core'
import {graphql} from 'gatsby'

const PostTemplate = props => {
  const {html, frontmatter} = props.data.markdownRemark
  const {title, pubDate, updDate, excerpt, tags} = frontmatter

  const handleTagClick = tag => () => null

  return (
    <Layout>
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={
        <div>
          <div>
            {excerpt ? excerpt + ' | ' : ''}
            Updated on {''}
            <Box component={'span'} fontWeight={'fontWeightBold'}>
              {updDate}
            </Box>
            {''} | Published on {''}
            <Box component={'span'} fontWeight={'fontWeightBold'}>
              {pubDate}
            </Box>
          </div>
          {tags.split(' ').map(tag => (
            <Chip label={tag} key={tag} clickable onClick={handleTagClick(tag)}
                  style={{marginRight: '0.5em'}} />
          ))}
        </div>
      } />
      <Divider />
      <CardContent>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </CardContent>
    </Layout>
  )
}

export default PostTemplate

export const postQuery = graphql`
  query PostQuery($postPath: String) {
    markdownRemark(fields: {path: {eq: $postPath}}) {
      html
      frontmatter {
        title
        pubDate(formatString: "YYYY-MM-DD")
        updDate(formatString: "YYYY-MM-DD")
        excerpt
        tags
      }
    }
  }
`
