import Head from '../../components/head'
import {CardContent, CardHeader, Divider} from '@material-ui/core'
import PostDate from '../../components/post/postDate'
import PostItem from '../../components/post/postItem'
import {GetStaticPaths, GetStaticProps} from 'next'
import getPosts from '../../utils/getPosts'
import {PostInfo} from '../../remark/post'

const Tag = (props: {tag: string, posts: PostInfo[]}) => {
  const {tag, posts} = props
  const updDate = posts.map(post => post.meta.updDate).reduce((a, b) => a > b ? a : b)
  const pubDate = posts.map(post => post.meta.pubDate).reduce((a, b) => a > b ? a : b)

  return (
    <>
      <Head title={`Tag ${tag}: Post List`} description={`All blog posts with tag ${tag}.`} path={`/tags/${tag}/`} />
      <CardHeader title={`Tag ${tag}`} titleTypographyProps={{component: 'h1'}} subheader={
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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts()
  const tags = Array.from(new Set(posts.flatMap(post => post.meta.tags.split(' '))))
  const paths = tags.map(tag => ({params: {tag}}))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const tag = params!['tag'] as string
  const posts = getPosts().filter(post => post.meta.tags.split(' ').indexOf(tag) !== -1)
  return {
    props: {
      tag,
      posts
    }
  }
}

export default Tag
