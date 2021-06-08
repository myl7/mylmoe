import {GetStaticPaths, GetStaticProps} from 'next'
import path from 'path'
import fs from 'fs'
import parse from '../../remark/parse'
import {Box, CardContent, CardHeader, Divider} from '@material-ui/core'
import Head from '../../components/head'
import {PostInfo} from '../../remark/post'

const Page = (props: {post: PostInfo}) => {
  const {meta, html} = props.post
  const {title, updDate, excerpt, path} = meta

  const fixStyles = (elem: HTMLDivElement) => elem

  return (
    <>
      <Head title={title} description={excerpt} path={path} />
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
        <div ref={fixStyles} dangerouslySetInnerHTML={{__html: html}} />
      </CardContent>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pageDir = path.join(process.cwd(), 'config', 'pages')
  const names = fs.readdirSync(pageDir).filter(name => name.endsWith('.md'))
  const slugs = names.map(name => name.substring(0, name.length - 3))
  const paths = slugs.map(slug => ({params: {slug}}))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = params!['slug'] as string
  const name = slug + '.md'
  const filePath = path.join(process.cwd(), 'config', 'pages', name)
  const content = await fs.promises.readFile(filePath).then(buf => buf.toString())
  const post = parse(name, content, '/pages/')
  return {
    props: {
      post
    }
  }
}

export default Page
