import React from 'react'
import Layout from '../components/layout'
import {CardContent, CardHeader, Chip, Divider} from '@material-ui/core'
import {graphql} from 'gatsby'
import HtmlHead from '../components/htmlHead'
import remarkFix from '../utils/remarkFix'
import Comment from '../components/comment'
import PostDate from '../components/post/postDate'
import IntLinkReset from '../components/links/intLinkReset'

const PostTemplate = props => {
  const {html, frontmatter, tableOfContents: toc} = props.data.markdownRemark
  const {title, pubDate, updDate, excerpt, tags} = frontmatter
  const path = props.data.markdownRemark.fields.path

  const fixBodyStyles = elem => remarkFix(elem)
  const fixTocStyles = elem => remarkFix(elem)

  return (
    <Layout>
      <HtmlHead title={title} description={excerpt} path={path} />
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={
        <div>
          <PostDate updDate={updDate} pubDate={pubDate}>
            {excerpt}
          </PostDate>
          {tags.split(' ').map(tag => (
            <Chip label={
              <IntLinkReset to={`/tags/${tag}/`}>
                {tag}
              </IntLinkReset>
            } key={tag} clickable style={{marginRight: '0.5em'}} />
          ))}
        </div>
      } />
      <Divider />
      <CardContent>
        <div ref={fixTocStyles} dangerouslySetInnerHTML={{__html: toc}} style={{marginBottom: '1em'}} />
        <div ref={fixBodyStyles} dangerouslySetInnerHTML={{__html: html}} style={{marginBottom: '1em'}} />
        <Comment />
      </CardContent>
    </Layout>
  )
}

export default PostTemplate

export const postQuery = graphql`
  query PostQuery($postPath: String) {
    markdownRemark(fields: {path: {eq: $postPath}}) {
      html
      tableOfContents(
        pathToSlugField: "fields.path"
      )
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
`
