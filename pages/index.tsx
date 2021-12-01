import Head from '../components/head'
import {CardContent, CardHeader, Divider} from '@material-ui/core'
import PostItem from '../components/post/postItem'
import {GetStaticProps} from 'next'
import PostDate from '../components/post/postDate'
import {PostInfo} from '../remark/post'
import getPosts from '../utils/getPosts'
import head from '../content/head'

const Index = (props: {posts: PostInfo[]}) => {
  const {posts} = props
  const updDate = posts.map(post => post.meta.updDate).reduce((a, b) => a > b ? a : b)
  const pubDate = posts.map(post => post.meta.pubDate).reduce((a, b) => a > b ? a : b)

  return (
    <>
      <Head path="/" {...head['/']} />
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
  const posts = getPosts()
  posts.sort((a, b) => (
    a.meta.updDate == b.meta.updDate ?
      -a.meta.pubDate.localeCompare(b.meta.pubDate) :
      -a.meta.updDate.localeCompare(b.meta.updDate)
  ))
  return {
    props: {
      posts
    }
  }
}

export default Index
