import {GetStaticPaths, GetStaticProps} from 'next'
import {PostInfo} from '../../remark/post'
import {CardContent, CardHeader, Chip, Divider} from '@material-ui/core'
import Head from '../../components/head'
import PostDate from '../../components/post/postDate'
import Comment from '../../components/comment'
import getPosts from '../../utils/getPosts'
import {useRouter} from 'next/router'

const Post = (props: {post: PostInfo}) => {
  const {meta, html} = props.post
  const {title, pubDate, updDate, excerpt, tags, path} = meta

  const fixStyles = (elem: HTMLDivElement) => elem

  const router = useRouter()

  const handleGo = (tag: string) => () => router.push(`/tags/${tag}/`)

  return (
    <>
      <Head title={title} description={excerpt} path={path} />
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={
        <div>
          <PostDate updDate={updDate} pubDate={pubDate}>
            {excerpt}
          </PostDate>
          {tags.split(' ').map(tag => (
            <Chip label={tag} key={tag} clickable onClick={handleGo(tag)} style={{marginRight: '0.5em'}} />
          ))}
        </div>
      } />
      <Divider />
      <CardContent>
        <div ref={fixStyles} dangerouslySetInnerHTML={{__html: html}} style={{marginBottom: '1em'}} />
        <Comment />
      </CardContent>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts()
  const paths = posts.map(post => ({params: {slug: post.meta.slug}}))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = params!['slug'] as string
  const post = getPosts().filter(post => post.meta.slug == slug)[0]!
  return {
    props: {
      post
    }
  }
}

export default Post
