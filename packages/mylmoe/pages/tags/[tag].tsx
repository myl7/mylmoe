import Head from '../../components/head'
import {CardContent, CardHeader, Divider} from '@material-ui/core'
import PostDate from '../../components/post/postDate'
import PostItem from '../../components/post/postItem'
import {GetServerSideProps} from 'next'
import {PostMeta} from '../../remark/post'
import fs from 'fs'
import lodash from 'lodash'

const Tag = (props: {tag: string, metas: PostMeta[]}) => {
  const {tag, metas} = props
  const updDate = metas.map(meta => meta.updDate).reduce((a, b) => a > b ? a : b)
  const pubDate = metas.map(meta => meta.pubDate).reduce((a, b) => a > b ? a : b)

  return (
    <>
      <Head title={`Tag ${tag}: Post List`} description={`All blog posts with tag ${tag}.`} path={`/tags/${tag}/`} />
      <CardHeader title={`Tag ${tag}`} titleTypographyProps={{component: 'h1'}} subheader={
        <PostDate updDate={updDate} pubDate={pubDate} />
      } />
      <Divider />
      <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
        {metas.map(meta => {
          const {title, pubDate, updDate, excerpt, tags, path} = meta
          return (
            <PostItem title={title} pubDate={pubDate} updDate={updDate} excerpt={excerpt} tags={tags} path={path}
                      key={path} style={{margin: '1em'}} />
          )
        })}
      </CardContent>
    </>
  )
}

const getTagRelText = lodash.memoize(() => {
  return fs.readFileSync('public/data/tagrel.json').toString()
})

export const getServerSideProps: GetServerSideProps = async ctx => {
  const tag = ctx.params!!['tag'] as string
  const map = new Map(JSON.parse(getTagRelText()))
  if (map.has(tag)) {
    return {props: {tag, metas: map.get(tag)}}
  } else {
    return {props: {tag: '', metas: []}}
  }
}

export default Tag
