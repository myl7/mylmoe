import React, {useEffect} from 'react'
import Layout from '../../components/layout'
import {CardContent, CardHeader} from '@material-ui/core'
import HtmlHead from '../../components/htmlHead'
import WIP from '../../components/wip'
import {useDispatch, useSelector} from 'react-redux'
import {brotliInitAction} from '../../redux/brotliRedux'
import init, {brotliDec} from '../../utils/brotli'
import {arcaeaProber} from '../../api/arcaea'
import {graphql, useStaticQuery} from 'gatsby'

const ArcaeaPage = () => {
  const title = 'Arcaea Scores'
  const description = 'See music game Arcaea song scores of myl7, ' +
    'or look up your own Arcaea scores with a beautiful visualization.'

  const dispatch = useDispatch()

  const brotliInit = useSelector(state => state.brotli.init)

  // Add ext to avoid same query, which will cause gatsby error
  const data = useStaticQuery(graphql`
    query ArcaeaQuery {
      file(relativePath: {eq: "brotli-dec-wasm_bg.wasm"}) {
        publicURL
        ext
      }
    }
  `)
  const brotliUrl = data.file.publicURL

  useEffect(() => {
    if (brotliInit) {
      brotliInit.then(() => {
        console.log(arcaeaProber({uid: '984569312', brotliDec: brotliDec}))
      })
    } else {
      dispatch(brotliInitAction(init(brotliUrl)))
    }
  }, [brotliInit]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout>
      <HtmlHead title={title} description={description} path={'/pages/arcaea'} />
      <CardHeader title={title} titleTypographyProps={{component: 'h1'}} subheader={description} />
      <CardContent>
        <WIP />
      </CardContent>
    </Layout>
  )
}

export default ArcaeaPage
