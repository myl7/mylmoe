import React from 'react'
import Layout from '../components/layout'
import {Box, CardContent, CardHeader, Divider} from '@material-ui/core'
import {graphql} from 'gatsby'
import HtmlHead from '../components/htmlHead'

const PageTemplate = props => {
  const {html, frontmatter} = props.data.markdownRemark
  const {title, updDate} = frontmatter
  const path = props.data.markdownRemark.fields.path

  return (
    <Layout>
      <HtmlHead title={title} description={''} path={path} />
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={
        <div>
          Updated on {''}
          <Box component={'span'} fontWeight={'fontWeightBold'}>
            {updDate}
          </Box>
        </div>
      } />
      <Divider />
      <CardContent>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </CardContent>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageQuery($pagePath: String) {
    markdownRemark(fields: {path: {eq: $pagePath}}) {
      html
      fields {
        path
      }
      frontmatter {
        title
        updDate(formatString: "YYYY-MM-DD")
      }
    }
  }
`
