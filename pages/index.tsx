import Head from '../components/head'
import {CardContent, CardHeader, Divider} from '@material-ui/core'
import PostItem from '../components/post/postItem'
import {GetStaticProps} from 'next'
import parse from '../remark/parse'
import PostDate from '../components/post/postDate'
import {PostInfo} from '../remark/post'
import fs from 'fs'
import path from 'path'

const Index = (props: {posts: PostInfo[]}) => {
  const {posts} = props
  const updDate = posts.map(post => post.meta.updDate).reduce((a, b) => a > b ? a : b)
  const pubDate = posts.map(post => post.meta.pubDate).reduce((a, b) => a > b ? a : b)

  return (
    <>
      <Head
        title={'Index & Post List'}
        description={'All blog posts & some probably useful utilities made by myl7'}
        path={'/'}
      />
      <CardHeader title={'Posts'} titleTypographyProps={{component: 'h1'}} subheader={
        <PostDate updDate={updDate} pubDate={pubDate} />
      } />
      <Divider />
      <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
        {posts.map(post => {
          const {title, pubDate, updDate, excerpt, tags, path} = post.meta
          return (
            <PostItem title={title} pubDate={pubDate} updDate={updDate} excerpt={excerpt} tags={tags} path={path}
                      key={path} style={{margin: '1em'}} />
          )
        })}
      </CardContent>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postDir = path.join(process.cwd(), 'config', 'posts')
  const names = await fs.promises.readdir(postDir)
  const posts = await Promise.all(names.filter(name => name.endsWith('.md')).map(async name => {
    const filePath = path.join(postDir, name)
    const content = await fs.promises.readFile(filePath).then(buf => buf.toString())
    return parse(name, content)
  }))
  posts.sort((a, b) => -a.meta.updDate.localeCompare(b.meta.updDate))
  return {
    props: {
      posts
    }
  }
}

export default Index
